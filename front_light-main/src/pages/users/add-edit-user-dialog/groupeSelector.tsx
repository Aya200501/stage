import { Group } from "@/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function GroupSelectorItem({
  group,
  groupId,
  setGroupId,
  level = 0,
}: {
  group: Group;
  level?: number;
  groupId: string;
  setGroupId: (groupId: string) => void;
}) {
  return (
    <>
      <PopoverClose asChild>
        <Button
          variant="ghost"
          className={cn("justify-start w-full text-left", {
            "bg-foreground/10": groupId === group.id,
          })}
          onClick={() => {
            setGroupId(group.id);
          }}
        >
          <span
            style={{
              paddingLeft: `${level * 1}rem`,
            }}
          >
            {group.name}
          </span>
        </Button>
      </PopoverClose>
      {group.subGroups?.length ? (
        <div className="flex flex-col">
          {group.subGroups.map((subGroup) => (
            <GroupSelectorItem
              level={level + 1}
              key={subGroup.id}
              group={subGroup}
              groupId={groupId}
              setGroupId={setGroupId}
            />
          ))}
        </div>
      ) : null}
    </>
  );
}

interface GroupSelectorProps extends Omit<ButtonProps, "children"> {
  groups: Group[];
  selectedGroupId: string;
  onValueChange: (index: number, groupId: string) => void;
  contentClassName?: string;
  selectedGroupIndex?: number;
}

export const GroupSelector = ({
  groups,
  selectedGroupId,
  onValueChange,
  contentClassName = "",
  selectedGroupIndex = undefined,
  ...props
}: GroupSelectorProps) => {
  const [groupId, setGroupId] = useState<string>(selectedGroupId);
  const flattenGroups = (groups: Group[] | undefined): Group[] => {
    if (!groups) return [];
    return groups.flatMap((group) => {
      return [group, ...flattenGroups(group.subGroups)];
    });
  };

  const flatGroups = flattenGroups(groups);

  const selectedGroup = flatGroups.find((group) => group.id === groupId);

  const onSelect = useCallback(
    (groupId: string) => {
      setGroupId(() => {
        onValueChange(selectedGroupIndex ?? 0, groupId);
        return groupId;
      });
    },
    [selectedGroupIndex]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button {...props}>
          {selectedGroup?.name ?? "Select Group"}
          <ChevronDownIcon size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("flex flex-col w-96 z-[515]", contentClassName)}
      >
        <ScrollArea>
          <div className="w-full flex flex-col">
            {groups.map((group) => (
              <GroupSelectorItem
                groupId={groupId}
                setGroupId={onSelect}
                key={group.id}
                group={group}
              />
            ))}
            {groups.length === 0 && (
              <div className="text-center">No groups found</div>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
