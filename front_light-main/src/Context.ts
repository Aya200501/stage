import BackendApi from "@/api/backend-api";
import { Group, GroupNode, ModelType, User } from "@/utils";
import React from "react";
import { GroupNodeTree } from "./utils/group-node-tree";

export const GlobalContext = React.createContext<{
  groupId: string;
  setGroupId: React.Dispatch<React.SetStateAction<string>>;
  groups: Group[] | undefined;
  setGroups: React.Dispatch<React.SetStateAction<Group[] | undefined>>;
  groupsTree: GroupNode | undefined;
  setGroupsTree: React.Dispatch<React.SetStateAction<GroupNode | undefined>>;
  userGroupsTree: GroupNodeTree | undefined | null;
  setUserGroupsTree: React.Dispatch<React.SetStateAction<GroupNodeTree | undefined | null>>;
  currentGroup: GroupNodeTree | undefined | null;
  setCurrentGroup: React.Dispatch<React.SetStateAction<GroupNodeTree | undefined | null>>;
  groupIds: {
    model: ModelType;
    ids: string[];
  }[];
  setGroupIds: React.Dispatch<React.SetStateAction<{
    model: ModelType;
    ids: string[];
  }[]>>;
  backendApi: BackendApi;
  theme: "light" | "dark";
  cameraName?: string;
  setCameraName?: React.Dispatch<React.SetStateAction<string>>;
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  refreshToken: string;
  setRefreshToken: React.Dispatch<React.SetStateAction<string>>;
  user: User | null | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
} | null>(null);

export function useGlobalContext() {
  const context = React.useContext(GlobalContext);
  if (!context) {
    throw new Error(
      `useGlobalContext must be used within a GlobalContext Provider`
    );
  }
  return context;
}
