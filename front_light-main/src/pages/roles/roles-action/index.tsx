import { MoreVertical, Pencil, Trash } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Role } from "@/utils/api-types";

interface RolesActionProps {
  role: Role;
  disabled?: boolean;
  hanelEdit: (role: Role) => void;
  handleDelete: (id: string) => void;
}

export const RolesAction = ({
  role,
  hanelEdit,
  handleDelete,
  disabled = false,
}: RolesActionProps) => {
  const { t } = useTranslation();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-8 w-8 bg-transparent p-0 text-[#D2D4DA] transition-all duration-500 hover:bg-white/10">
          <MoreVertical className="size-5 stroke-2 text-gray-600 dark:text-gray-400" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="absolute -top-8 right-8 flex flex-col gap-2.5 rounded-lg border-[0.5px] border-[#ABBED1] bg-[#26323899] p-2 backdrop-blur-[12px] "
      >
        <Button
          disabled={disabled}
          className={cn(
            "flex items-center justify-center rounded-lg font-medium  gap-3 bg-[#F5F7FA]/10  text-[#F5F7FA] hover:bg-[#F5F7FA]/5 hover:text-[#F5F7FA]/70"
          )}
          onClick={() => {
            hanelEdit(role);
          }}
        >
          <span className={cn("flex items-center justify-center rounded-full")}>
            <Pencil className="size-5" />
          </span>
          <span className="first-letter:uppercase">{t("edit role")}</span>
        </Button>
        <div className="w-full border border-[#89939E]" />
        <Button
          className="gap-3  bg-[#FF3D00]/10 text-sm text-[#FF3D00] font-medium  hover:bg-[#FF3D00]/5 hover:text-[#FF3D00]/70"
          onClick={() => {
            handleDelete(role.id);
          }}
          disabled={disabled}
        >
          <Trash className="size-4" />
          <span className="first-letter:uppercase">{t("delete role")}</span>
        </Button>
      </PopoverContent>
    </Popover>
  );
};
