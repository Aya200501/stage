import { Checkbox } from "@/components/ui/checkbox";
import ArchiveIcon from "@/assets/icons/archive.svg?react";

interface NotificationProps {
  title: string;
  date: string;
  description: string;
  isArchived: boolean;
}
export const Notification = ({
  title,
  date,
  description,
  isArchived = true,
}: NotificationProps) => {
  return (
    <div
      data-state={isArchived ? "archived" : "active"}
      className="group flex w-full cursor-pointer justify-between rounded-lg bg-muted p-3 text-muted-foreground data-[state=archived]:opacity-50"
    >
      <div className="flex gap-5">
        <Checkbox className="mt-1.5 size-5" />
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-1.5 text-sm 2xl:text-base">
            <span className="font-semibold">{title}</span>
            <span className="font-medium text-[#89939E]">-</span>
            <span className="text-xs font-medium text-[#89939E] 2xl:text-sm">
              {date}
            </span>
          </div>
          <div className="text-xs font-medium 2xl:text-sm">{description}</div>
        </div>
      </div>

      <div className="hidden size-7 items-center justify-center rounded-full bg-card transition-all duration-500 group-hover:flex border">
        <ArchiveIcon className="fill-current text-muted-foreground size-5" />
      </div>
    </div>
  );
};
