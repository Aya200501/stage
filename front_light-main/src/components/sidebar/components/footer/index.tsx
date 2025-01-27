import React from "react";
import { GroupSelector } from "@/components/group-selector";
import UserButton from "./components/user-button";
import { cn } from "@/lib/utils";

interface SidebarFooterProps {
  sidebarOpen: boolean;
}

export const SidebarFooter = ({ sidebarOpen }: SidebarFooterProps) => {
  return (
    <React.Fragment>
      <div
        className={cn(
          "px-4 transition-opacity duration-200",
          !sidebarOpen && "flex justify-center"
        )}
      >
        <GroupSelector
          className={cn(
            sidebarOpen && "w-full justify-start text-left truncate ",
            !sidebarOpen &&
              "px-0 bg-transparent border-none hover:bg-transparent active:bg-transparent hover:text-primary"
          )}
          sidebarOpen={sidebarOpen}
        />
      </div>
      <div className="px-3.5 mb-4">
        <UserButton sidebarOpen={sidebarOpen} />
      </div>
    </React.Fragment>
  );
};
