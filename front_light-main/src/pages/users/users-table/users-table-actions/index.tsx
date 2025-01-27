import { UserType } from "@/utils";
import { MoreVertical, Trash } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { useGlobalContext } from "@/Context";
import { useConfirmDialog } from "@/components/confirm-dialog";
import { AddEditUserDialog } from "../../add-edit-user";
import { useUsers } from "../../store";
import { toast } from "sonner";

export const UsersTableActions = ({ user }: { user: UserType }) => {
  const { backendApi } = useGlobalContext();
  const { confirm } = useConfirmDialog();
  const [isLoading, setIsLoading] = useState(false);
  const { items, setItems } = useUsers();

  const handleDelete = async () => {
    setIsLoading(true);
    confirm({
      confirmTitle: "Are you sure?",
      confirmMessage:
        "This action cannot be undone. Are you sure you want to proceed?",
      onConfirm: async () => {
        try {
          await backendApi.DeleteById("user", user.id);
          setItems(items.filter((item) => item.id !== user.id));
        } catch (error) {
          toast.error("Failed to delete user");
        }
      },
    });
    setIsLoading(false);
  };

  const userData = useMemo(() => {
    const {
      id,
      roles,
      email,
      fullName,
      isSuperAdmin: sysAdmin,
      image,
      attributes,
    } = user;

    const groupRoles = roles.map((role) => {
      return {
        groupId: role.group.id,
        roleId: role.role.id,
      };
    });

    return {
      id,
      email,
      fullName,
      sysAdmin,
      image,
      phoneNumber: attributes?.phoneNumber ?? "",
      groupRoles,
    };
  }, [user]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-8 w-8 bg-transparent p-0 text-[#D2D4DA] transition-all duration-500 hover:bg-white/10 ">
          <MoreVertical className="size-5 stroke-2 text-gray-600 dark:text-gray-400" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="absolute -top-8 right-8 flex flex-col gap-2.5 rounded-lg border-[0.5px] border-[#ABBED1] bg-[#26323899] p-2 backdrop-blur-[12px] w-52"
      >
        <AddEditUserDialog type="edit" user={userData} />
        <div className="w-full border border-[#89939E]" />
        <Button
          className="gap-3 bg-[#FF3D00]/10 text-[#FF3D00] hover:bg-[#FF3D00]/5 hover:text-[#FF3D00]/70"
          onClick={handleDelete}
          disabled={isLoading}
        >
          <Trash className="size-4" />
          Delete User
        </Button>
      </PopoverContent>
    </Popover>
  );
};
