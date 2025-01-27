import { Group } from "@/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { Link, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export function GroupSelectorItem({
  group,
  level = 0,
}: {
  group: Group;
  level?: number;
}) {
  const { groupId } = useParams<{
    groupId: string;
  }>();

  return (
    <>
      <PopoverClose asChild>
        <Link to={`/${group.id}`}>
          <Button
            variant="ghost"
            className={cn("justify-start w-full text-left", {
              "bg-foreground/10": groupId === group.id,
            })}
            onClick={() => {
              console.log("Selected group", group);
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
        </Link>
      </PopoverClose>
      {group.subGroups?.length ? (
        <div className="flex flex-col">
          {group.subGroups.map((subGroup) => (
            <GroupSelectorItem
              level={level + 1}
              key={subGroup.id}
              group={subGroup}
            />
          ))}
        </div>
      ) : null}
    </>
  );
}

interface GroupSelectorProps extends Omit<ButtonProps, "children"> {
  groups: Group[];
}

export const GroupSelector = ({ groups, ...props }: GroupSelectorProps) => {
  const { t } = useTranslation();
  const { groupId } = useParams();
  const flattenGroups = (groups: Group[] | undefined): Group[] => {
    if (!groups) return [];
    return groups.flatMap((group) => {
      return [group, ...flattenGroups(group.subGroups)];
    });
  };

  const flatGroups = flattenGroups(groups);

  const selectedGroup = flatGroups.find((group) => group.id === groupId);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button {...props}>
          {selectedGroup?.name ?? "Select Group"}
          <ChevronDownIcon size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col w-56">
        {groups.map((group) => (
          <GroupSelectorItem key={group.id} group={group} />
        ))}
        {groups.length === 0 && (
          <div className=" text-center">{t("noData")}</div>
        )}
      </PopoverContent>
    </Popover>
  );
};
