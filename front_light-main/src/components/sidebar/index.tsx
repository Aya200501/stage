import { useState } from "react";
import { routes } from "./utils/routes";
import { useGlobalContext } from "@/Context";

import { SidebarContent } from "./components/content";
import { SidebarHeader } from "./components/header";
import { SidebarFooter } from "./components/footer";
import { useUserGroups } from "./hooks/use-user-groups";
import { filterRoutes } from "./utils/functions";

export const Sidebar = () => {
  const {
    user,
    groupId,
    setGroupsTree,
    backendApi,
    setUserGroupsTree,
    currentGroup,
    setCurrentGroup,
    setGroupId,
    setGroups,
  } = useGlobalContext();

  const [sidebarOpen, setSidebarOpen] = useState(
    window.innerWidth > 1440 ? true : false
  );

  const {} = useUserGroups({
    user,
    groupId,
    backendApi,
    setGroupsTree,
    setUserGroupsTree,
    setCurrentGroup,
    setGroupId,
    setGroups,
  });

  const filteredRoutes = filterRoutes(routes, user, currentGroup);

  return (
    <>
      <input
        checked={sidebarOpen}
        onChange={() => setSidebarOpen((prev) => !prev)}
        type="checkbox"
        id="sidebar-toggle"
        hidden
        className="peer"
      />
      <div className="fixed gap-4 flex flex-col inset-0 lg:inset-y-4 lg:left-4 lg:rounded-xl  lg:w-16 bg-white shadow dark:border-transparent dark:bg-muted text-muted-foreground lg:peer-checked:w-60 w-full transition-[background,color,width,transform] duration-500 max-lg:-translate-x-full peer-checked:translate-x-0 z-20">
        <SidebarHeader sidebarOpen={sidebarOpen} />
        <SidebarContent
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          filteredRoutes={filteredRoutes}
        />
        <SidebarFooter sidebarOpen={sidebarOpen} />
      </div>
    </>
  );
};
