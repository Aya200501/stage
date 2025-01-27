import {
  Ability,
  groupHierarchyOrder,
  GroupType,
  ModelType,
  PermissionType,
  TPolygon,
} from "../api-types";

const comparePermissions = (perm1: PermissionType, perm2: PermissionType) => {
  const levels = { NONE: 0, READ: 1, WRITE: 2, MANAGE: 3 };
  return levels[perm1] > levels[perm2] ? perm1 : perm2;
};

// Merges the abilities of a child group with those of its parent group
export const mergeAbilitiesWithParent = (
  childAbilities: Ability[],
  parentAbilities: Ability[]
): Ability[] => {
  const mergedAbilities: Ability[] = [];

  const parentAbilityMap = new Map<ModelType, PermissionType>(
    parentAbilities.map((ability) => [ability.model, ability.permission])
  );

  // For each child ability, check if the parent has a higher permission level
  childAbilities.forEach((childAbility) => {
    const parentPermission = parentAbilityMap.get(childAbility.model);
    mergedAbilities.push({
      model: childAbility.model,
      permission: parentPermission
        ? comparePermissions(parentPermission, childAbility.permission)
        : childAbility.permission,
    });
  });

  // Include parent abilities that the child doesn't have
  parentAbilities.forEach((parentAbility) => {
    if (!childAbilities.some((child) => child.model === parentAbility.model)) {
      mergedAbilities.push(parentAbility);
    }
  });

  return mergedAbilities;
};

export class GroupNodeTree {
  id: string;
  name: string;
  type: GroupType | null;
  parent?: GroupNodeTree | null;
  abilities: Ability[];
  children: GroupNodeTree[];
  polygon?: TPolygon;

  constructor(
    id: string,
    name: string,
    type: GroupType | null,
    abilities: Ability[] = [],
    polygon?: TPolygon
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.abilities = abilities;
    this.children = [];
    this.polygon = polygon;
  }

  // Add a child node, inheriting and merging abilities
  addChild(child: GroupNodeTree) {
    child.parent = this;
    if (this.abilities.length > 0) {
      child.abilities = mergeAbilitiesWithParent(
        child.abilities,
        this.abilities
      );
    }
    this.children.push(child);
  }

  getAbilityWithModel(model: ModelType, isSuperAdmin: boolean = false): number {
    if (isSuperAdmin === true) return 3;
    const ability = this.abilities.find((ability) => ability.model === model);
    if (!ability) return 0;
    if (ability.permission === "READ") return 1;
    if (ability.permission === "WRITE") return 2;
    return 3;
  }

  getAllGroupIds(): string[] {
    let ids: string[] = [this.id]; // Start with the current group's ID

    // Recursively collect all children IDs
    for (const child of this.children) {
      ids = ids.concat(child.getAllGroupIds()); // Get IDs from children recursively
    }

    return ids;
  }

  /**
   * Retrieves groups that match the specified group type based on the hierarchy.
   * - If the current group matches the target type, returns an array with only the current group.
   * - If the target type is higher in the hierarchy than the current group, returns the first matching parent or grandparent.
   * - If the target type is lower in the hierarchy, returns all children or descendants that match the target type.
   *
   * @param targetType - The type of group to search for (e.g., "REGION", "CITY", "SITE", "COUNTRY", "AREA").
   * @returns An array of `GroupNodeTree` objects matching the specified type.
   */
  getGroupsByTypeHierarchy(targetType: GroupType): GroupNodeTree[] {
    // Helper function to determine the index of a group type in the hierarchy
    const getTypeIndex = (type: GroupType | null): number =>
      type ? groupHierarchyOrder.indexOf(type) : -1;

    const currentTypeIndex = getTypeIndex(this.type);
    const targetTypeIndex = getTypeIndex(targetType);

    // Case 1: If the current group matches the target type, return the current group itself
    if (this.type === targetType) {
      return [this];
    }

    // Case 2: If the target type is higher in the hierarchy, find the closest matching parent
    if (targetTypeIndex < currentTypeIndex) {
      let currentNode: GroupNodeTree | undefined | null = this.parent;
      while (currentNode) {
        if (currentNode.type === targetType) {
          return [currentNode];
        }
        currentNode = currentNode.parent || null;
      }
      return []; // No matching parent found
    }

    // Case 3: If the target type is lower in the hierarchy, find all matching descendants
    const matchingDescendants: GroupNodeTree[] = [];

    const collectDescendants = (node: GroupNodeTree) => {
      if (node.type === targetType) {
        matchingDescendants.push(node);
      }
      node.children.forEach(collectDescendants);
    };

    this.children.forEach(collectDescendants);
    return matchingDescendants;
  }
}

export function findGroupById(
  root: GroupNodeTree,
  groupId: string
): GroupNodeTree | null {
  // Base case: check if the current node matches the groupId
  if (root.id === groupId) {
    return root;
  }

  // Recursively search through the children
  for (let child of root.children) {
    const found = findGroupById(child, groupId);
    if (found) {
      return found;
    }
  }

  // If not found, return null
  return null;
}

export type GroupNodeTreeType = GroupNodeTree | null | undefined;
