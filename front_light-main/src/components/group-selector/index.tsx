import { useGlobalContext } from "@/Context";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, MapPin } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { GroupNodeTree } from "@/utils/group-node-tree";

export function GroupSelectorItem({
  group,
  level = 0,
  isSupperAdmin,
  onSelect,
}: {
  level?: number;
  group: GroupNodeTree;
  isSupperAdmin: boolean;
  onSelect?: (group: GroupNodeTree) => void;
}) {
  const { groupId, setGroupId, setCurrentGroup } = useGlobalContext();

  return (
    <>
      <PopoverClose asChild>
        <Button
          variant="ghost"
          className={cn("justify-start w-full text-left", {
            "bg-foreground/10": groupId === group.id,
          })}
          disabled={isSupperAdmin === false && group.abilities.length === 0}
          onClick={() => {
            if (!onSelect) {
              setGroupId(group.id);
              setCurrentGroup(group);
            } else onSelect?.(group);
          }}
        >
          <span className="truncate" style={{ paddingLeft: `${level * 1}rem` }}>
            {group.name}
          </span>
        </Button>
      </PopoverClose>
      {group.children.map((child) => (
        <GroupSelectorItem
          key={child.id}
          group={child}
          level={level + 1}
          isSupperAdmin={isSupperAdmin}
        />
      ))}
    </>
  );
}

interface GroupSelectorProps {
  className?: string;
  onSelect?: (group: GroupNodeTree) => void;
  sidebarOpen?: boolean;
}

export const GroupSelector = ({
  className = "",
  onSelect,
  sidebarOpen = true,
}: GroupSelectorProps) => {
  const { userGroupsTree, currentGroup, user } = useGlobalContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  if (pathname === "/") navigate("/dashboards", { replace: true });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={userGroupsTree?.children.length === 0}
          variant="outline"
          size="sm"
          className={className}
        >
          {sidebarOpen ? (
            <>
              <span className="flex-1 truncate">
                {currentGroup?.name ?? "Select Group"}
              </span>
              <ChevronDownIcon />
            </>
          ) : (
            <MapPin />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="flex flex-col w-56 z-[502] overflow-auto max-h-[60vh] hide-scrollbar"
        side={sidebarOpen ? "top" : "right"}
        align={sidebarOpen ? "center" : "end"}
      >
        {userGroupsTree?.children.map((group) => (
          <GroupSelectorItem
            key={group.id}
            group={group}
            isSupperAdmin={user?.isSuperAdmin ?? false}
            onSelect={onSelect}
          />
        ))}

        {userGroupsTree?.children.length === 0 && (
          <div className="text-center">No groups found</div>
        )}
      </PopoverContent>
    </Popover>
  );
};
