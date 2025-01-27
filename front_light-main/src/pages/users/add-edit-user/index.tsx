import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import Edit from "/src/assets/icons/edit.svg?react";
import { Content } from "./content";
import { useState } from "react";
import { useGlobalContext } from "@/Context";
import { FindManyParams, Role } from "@/utils/api-types";
import useSWR from "swr";
import { useTranslation } from "react-i18next";

interface AddEditUserDialogProps {
  type: "add" | "edit";
  user?: {
    id: string;
    email: string;
    fullName: string;
    sysAdmin: boolean;
    phoneNumber: string;
    groupRoles: {
      groupId: string;
      roleId: string;
    }[];
  };
}

export const AddEditUserDialog = ({ type, user }: AddEditUserDialogProps) => {
  const { backendApi } = useGlobalContext();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const params: FindManyParams = {
    pagination: {
      page: 1,
      perPage: 100,
    },
    select: {
      id: true,
      name: true,
    },
  };

  const key = `roles?${JSON.stringify(params)}`;
  const { data } = useSWR(key, async () => {
    const { results } = await backendApi.findMany<Role>("role", params);
    return results;
  });

  const roles = data ?? [];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "gap-3 bg-[#F5F7FA]/10 text-[#F5F7FA] hover:bg-[#F5F7FA]/10 hover:opacity-80",
            type === "add" &&
              "bg-primary hover:bg-primary hover:text-primary-foreground"
          )}
          onClick={() => setIsOpen(true)}
        >
          {type === "add" ? (
            <PlusIcon size={18} />
          ) : (
            <Edit className="size-4" />
          )}
          {type === "add" ? t("Add members") : t("Edit User")}
        </Button>
      </DialogTrigger>
      {isOpen && (
        <Content
          type={type}
          roles={roles}
          defaultValues={user}
          onClose={() => setIsOpen(false)}
        />
      )}
    </Dialog>
  );
};
