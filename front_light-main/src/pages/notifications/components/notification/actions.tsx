import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import ArchiveIcon from "@/assets/icons/archive.svg?react";
import TrashIcon from "@/assets/icons/trash.svg?react";

export const Actions = () => {
  return (
    <div className="flex items-center gap-5 px-3 text-red-500">
      <Checkbox className="size-5" />
      <Button
        size="icon"
        className="w-fit bg-transparent hover:bg-transparent text-card-foreground"
      >
        <ArchiveIcon className="fill-current" />
      </Button>
      <Button
        size="icon"
        className="w-fit bg-transparent hover:bg-transparent text-card-foreground"
      >
        <TrashIcon className="fill-current" />
      </Button>
    </div>
  );
};
