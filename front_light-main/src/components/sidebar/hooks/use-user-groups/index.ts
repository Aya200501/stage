
import BackendApi from "@/api/backend-api";
import { buildTree, FindManyParams, findUserAbilitiesInGroup, Group, GroupType, ROOT_GROUP } from "@/utils";
import { findGroupById, GroupNodeTree } from "@/utils/group-node-tree";
import useSWR from "swr";

interface GroupTreeBuilder {
  buildParentNodes: (
    group: Group,
    root: GroupNodeTree,
    groupMap: Map<string, GroupNodeTree>
  ) => GroupNodeTree | undefined;
  buildSubGroups: (
    groupNode: GroupNodeTree,
    subGroups?: Group[],
    groupMap?: Map<string, GroupNodeTree>
  ) => void;
}

const GroupTypeMap: Record<GroupType, number> = {
  COUNTRY: 5,
  REGION: 4,
  CITY: 3,
  SITE: 2,
  AREA: 1,
};

class GroupTreeBuilderImpl implements GroupTreeBuilder {
  constructor(private user: any) { }

  buildParentNodes(
    group: Group,
    root: GroupNodeTree,
    groupMap: Map<string, GroupNodeTree>
  ): GroupNodeTree | undefined {
    if (!group.parentId) return undefined;

    let parentNode = groupMap.get(group.parentId);
    if (!parentNode && group.parent) {
      const parentAbilities = findUserAbilitiesInGroup(
        group.parent.id,
        this.user?.roles || []
      );
      parentNode = new GroupNodeTree(
        group.parent.id,
        group.parent.name,
        group.parent.type,
        parentAbilities
      );
      groupMap.set(group.parent.id, parentNode);

      const grandParentNode = this.buildParentNodes(
        group.parent,
        root,
        groupMap
      );
      if (grandParentNode) {
        grandParentNode.addChild(parentNode);
      } else {
        root.addChild(parentNode);
      }
    }
    return parentNode;
  }

  buildSubGroups(
    groupNode: GroupNodeTree,
    subGroups?: Group[],
    groupMap?: Map<string, GroupNodeTree>
  ) {
    subGroups?.forEach((subGroup) => {
      let subGroupNode = groupMap?.get(subGroup.id);
      if (!subGroupNode) {
        const subGroupAbilities = findUserAbilitiesInGroup(
          subGroup.id,
          this.user?.roles || []
        );
        subGroupNode = new GroupNodeTree(
          subGroup.id,
          subGroup.name,
          subGroup.type,
          subGroupAbilities,
          subGroup.polygon
        );
        groupMap?.set(subGroup.id, subGroupNode);
      }
      groupNode.addChild(subGroupNode);
      this.buildSubGroups(subGroupNode, subGroup.subGroups, groupMap);
    });
  }
}

interface UseUserGroupsProps {
  user: any;
  groupId: string;
  backendApi: BackendApi;
  setGroupsTree: (tree: any) => void;
  setUserGroupsTree: (tree: any) => void;
  setCurrentGroup: (group: any) => void;
  setGroupId: (id: string) => void;
  setGroups: (groups: Group[]) => void;
}

export function useUserGroups({
  user,
  groupId,
  backendApi,
  setGroupsTree,
  setUserGroupsTree,
  setCurrentGroup,
  setGroupId,
  setGroups,
}: UseUserGroupsProps) {
  const treeBuilder = new GroupTreeBuilderImpl(user);

  const groupTreeParams: FindManyParams = {
    where: {
      ...(user?.isSuperAdmin
        ? { type: ROOT_GROUP }
        : {
          OR: [
            {
              roleUserGroups: { some: { users: { some: { id: user?.id } } } },
            },
          ],
        }),
    },
    include: {
      parent: {
        include: {
          parent: { include: { parent: { include: { parent: true } } } },
        },
      },
      subGroups: {
        include: {
          subGroups: {
            include: { subGroups: { include: { subGroups: true } } },
          },
        },
      },
    },
  };

  const { data: treeData } = useSWR(
    "user-groups-tree",
    async () => {
      const { results } = await backendApi.findMany<Group>(
        "group",
        groupTreeParams
      );
      const root = new GroupNodeTree("root", "Root Node", null);
      const groupMap = new Map<string, GroupNodeTree>();

      results.forEach((group) => {
        let groupNode = groupMap.get(group.id);
        if (!groupNode) {
          const groupAbilities = findUserAbilitiesInGroup(
            group.id,
            user?.roles || []
          );
          groupNode = new GroupNodeTree(
            group.id,
            group.name,
            group.type,
            groupAbilities,
            group.polygon
          );
          groupMap.set(group.id, groupNode);
        }

        if (group.type === ROOT_GROUP) {
          root.addChild(groupNode);
        } else {
          const parentNode = treeBuilder.buildParentNodes(
            group,
            root,
            groupMap
          );
          parentNode?.addChild(groupNode);
        }

        treeBuilder.buildSubGroups(groupNode, group.subGroups, groupMap);
      });

      return { tree: root, groups: results };
    },
    {
      onSuccess: (data) => {
        const { groups, tree } = data;
        setUserGroupsTree(tree);

        const setValidGroup = (id: string) => {
          const currentGroup = findGroupById(tree, id);
          if (currentGroup) {
            setCurrentGroup(currentGroup);
            return true;
          }
          return false;
        };

        if (groupId && setValidGroup(groupId)) return;
        if (groups.length > 0 && setValidGroup(groups[0].id)) {
          setGroupId(groups[0].id);
          return;
        }

        setGroupId("");
        setCurrentGroup(null);
      },
    }
  );

  const groupsParams = {
    pagination: { page: 1, perPage: 12 },
    where: user?.isSuperAdmin
      ? { type: ROOT_GROUP }
      : { id: { in: user?.roles.map((role: any) => role.groupId) } },
    select: {
      id: true,
      name: true,
      type: true,
      parentId: true,
      polygon: true,
      subGroups: {
        select: {
          id: true,
          name: true,
          type: true,
          parentId: true,
          polygon: true,
          subGroups: {
            select: {
              id: true,
              name: true,
              type: true,
              parentId: true,
              polygon: true,
              subGroups: {
                select: {
                  id: true,
                  name: true,
                  type: true,
                  parentId: true,
                  polygon: true,
                  subGroups: {
                    select: {
                      id: true,
                      name: true,
                      type: true,
                      parentId: true,
                      polygon: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  const { data: groupsData } = useSWR(
    "user-groups",
    async () => {
      const { results } = await backendApi.findMany<Group>(
        "group",
        groupsParams
      );
      const sortedResults = results.sort((a, b) => {
        const aType = GroupTypeMap[a.type] || 0;
        const bType = GroupTypeMap[b.type] || 0;
        return bType - aType;
      });

      const groupIds: string[] = [];
      return sortedResults.filter((group) => {
        if (!groupIds.includes(group.id)) {
          groupIds.push(group.id);
          return true;
        }
        return false;
      });
    },
    {
      onSuccess: (data) => {
        if (data.length !== 0 && groupId === "") {
          setGroupId(data[0].id);
        }
        setGroups(data);
        if (user && data) {
          const rootGroup = {
            name: "root",
            id: "root",
            subGroups: data,
          } as Group;
          const tree = buildTree(user, rootGroup, null);
          setGroupsTree(tree);
        }
      },
    }
  );

  return {
    groupsTree: treeData?.tree,
    groups: groupsData,
  };
}
