import {
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import Upload from "/src/assets/icons/upload.svg?react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { GroupSelector } from "@/pages/users/add-edit-user-dialog/groupeSelector";
import { useGlobalContext } from "@/Context";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Role, User, UserType } from "@/utils";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import { useTranslation } from "react-i18next";
import { PhoneInput } from "@/components/inputs/phone-input";
import { FieldValues, useForm } from "react-hook-form";
import {
  EditUserSchema,
  AddUserSchema,
  AddUserType,
  EditUserType,
  AddUserDefaultValues,
} from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUsers } from "../../store";

interface ContentProps {
  type: "add" | "edit";
  roles: Role[];
  defaultValues?: {
    id: string;
    fullName: string;
    email: string;
    sysAdmin: boolean;
    image?: string;
    phoneNumber?: string;
    groupRoles: {
      groupId: string;
      roleId: string;
    }[];
  };
  onClose: () => void;
}

export const Content = ({
  type,
  roles,
  defaultValues,
  onClose,
}: ContentProps) => {
  const schema = type === "add" ? AddUserSchema : EditUserSchema;
  const form = useForm<AddUserType | EditUserType>({
    resolver: zodResolver(schema),
    defaultValues:
      type === "add"
        ? AddUserDefaultValues
        : {
            fullName: defaultValues?.fullName || "",
            email: defaultValues?.email || "",
            phoneNumber: defaultValues?.phoneNumber || "",
            password: "",
          },
  });
  const [isSysAdmin, setIsSysAdmin] = useState(
    defaultValues?.sysAdmin || false
  );

  const { items, setItems } = useUsers();
  const { t } = useTranslation();

  const { mutate } = useSWRConfig();

  const [groupRoles, setGroupRoles] = useState<
    {
      groupId: string;
      roleId: string;
    }[]
  >(defaultValues?.groupRoles || []);

  const { groups, backendApi, user } = useGlobalContext();

  const handleAddRole = () => {
    setGroupRoles((prev) => [
      ...prev,
      {
        groupId: "",
        roleId: "",
      },
    ]);
  };

  const handleGroupSelect = (index: number, groupId: string) => {
    setGroupRoles((prev) =>
      prev.map((el, i) =>
        i === index
          ? {
              ...el,
              groupId,
            }
          : el
      )
    );
  };

  const OnSubmit = async (data: FieldValues) => {
    const formData = new FormData();
    const { fullName, email, password, phoneNumber, image } = data;
    try {
      const emailCheckParams = {
        where: { email },
        select: { id: true },
      };
      const emailExistsResponse = await backendApi.findMany<User>(
        "user",
        emailCheckParams
      );
      const emailExists = emailExistsResponse.results;
      if (emailExists.length > 0 && type === "add") {
        toast.error(
          "Email already exists. Please use a different email address."
        );
        return;
      }
      const filtredGroupRoles = groupRoles.filter(
        (el) => el.groupId && el.roleId
      );
      if (isSysAdmin === false && filtredGroupRoles.length === 0) {
        toast.error(
          user?.isSuperAdmin
            ? "Please make sure that the user is sysAdmin or has at least one group and role."
            : "Please select at least one group and role."
        );
        return;
      }

      formData.append("fullName", fullName);
      formData.append("email", data.email);
      if (type === "add" || password) {
        formData.append("password", data.password);
      }
      formData.append("isSuperAdmin", JSON.stringify(isSysAdmin));
      if (isSysAdmin) {
        formData.append("roles", JSON.stringify([]));
      } else {
        formData.append("roles", JSON.stringify(filtredGroupRoles));
      }
      if (image) {
        formData.append("image", image);
      }
      if (phoneNumber) {
        formData.append("attributes", JSON.stringify({ phoneNumber }));
      }

      if (type === "add") {
        const user: UserType = await backendApi.create("user", formData, {
          include: {
            roles: {
              select: {
                id: true,
                group: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
                role: {
                  select: {
                    id: true,
                    name: true,
                    color: true,
                  },
                },
              },
            },
          },
        });
        setItems([user, ...items]);
      } else if (defaultValues) {
        const user: UserType = await backendApi.update(
          "user",
          defaultValues.id,
          formData,
          {
            include: {
              roles: {
                select: {
                  id: true,
                  group: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                  role: {
                    select: {
                      id: true,
                      name: true,
                      color: true,
                    },
                  },
                },
              },
            },
          }
        );
        setItems(items.map((el) => (el.id === user.id ? user : el)));
      } else {
        throw new Error("User is null when attempting to update.");
      }
      mutate(
        (key) => typeof key === "string" && key.includes("users-findMany")
      );
      onClose();
      toast.success("User saved successfully.");
    } catch (error) {
      toast.error(t("an error occurred. Please try again later."));
    }
  };

  return (
    <DialogContent
      hideCloseButton
      className="z-[510] max-w-xl py-7 pl-5 pr-5  max-h-[calc(100dvh-4rem)] flex flex-col"
      overlayClassName="z-[509]"
      aria-describedby="modal-description"
    >
      <DialogTitle className="text-xl font-semibold leading-none tracking-tight">
        {type === "add" ? t("Add members") : t("Edit User")}
      </DialogTitle>
      <DialogClose className="absolute top-[1.8rem] right-8">
        <X className="size-6" />
        <span className="sr-only first-letter:uppercase">{t("close")}</span>
      </DialogClose>
      <ScrollArea className=" h-full flex-1 flex flex-col gap-4 py-1">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(OnSubmit)}
            className="h-full flex flex-col gap-3 flex-1 p-4"
          >
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Label className="w-full border-2 border-[#979797]/50 rounded border-dashed h-44 min-h-44 cursor-pointer hover:bg-muted/25 flex flex-col gap-3 items-center justify-center p-2">
                      {field.value ? (
                        <img
                          src={URL.createObjectURL(field.value)}
                          alt="map"
                          className="w-full h-full object-contain"
                        />
                      ) : defaultValues?.image ? (
                        <img
                          src={defaultValues.image}
                          alt="map"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <>
                          <Upload className="size-6" />
                          <span className="text-sm font-medium text-[#979797]">
                            {t("Drop or upload image profile")}
                          </span>
                        </>
                      )}
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          field.onChange(e.target.files?.[0] || null)
                        } // Handle the file input
                      />
                    </Label>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col gap-1.5">
                      <span className=" font-medium ">{t("Full Name")}</span>
                      <Input
                        type="text"
                        placeholder={t("Full Name")}
                        className="w-full bg-card h-12 px-4 placeholder:text-gray-400 text-white"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col gap-1.5">
                      <span className="font-medium">Email</span>
                      <Input
                        type="email"
                        placeholder="Email"
                        className="w-full bg-card h-12 px-4 placeholder:text-gray-400 text-white"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col gap-1.5">
                      <span className=" font-medium capitalize">
                        {t("password")}
                      </span>
                      <Input
                        type="password"
                        placeholder={t("password")}
                        className="w-full bg-card h-12 px-4 placeholder:text-gray-400 text-white placeholder:capitalize"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <span className=" font-medium capitalize">
                    {`${t("Phone Number")}`}
                  </span>
                  <FormControl className="w-full">
                    <PhoneInput
                      placeholder={`${t("Enter a phone number")}`}
                      {...field}
                      className="w-full bg-card h-12  placeholder:text-gray-400 text-white placeholder:capitalize items-center justify-center rounded-md border border-input text-sm p-0 place"
                      defaultCountry="MA"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-3">
                <span className="text-sm font-medium">{t("groups")}</span>
                <span className="text-sm font-medium text-center">
                  {t("roles")}
                </span>
                {user?.isSuperAdmin && (
                  <div className="flex items-center gap-2 justify-end">
                    {t("SysAdmin")}
                    <Checkbox
                      name="sysAdmin"
                      className="border-[#6F6F6F]"
                      checked={isSysAdmin}
                      onCheckedChange={() => setIsSysAdmin((prev) => !prev)}
                    />
                  </div>
                )}
              </div>
              <div
                className={cn(
                  "min-h-10 flex flex-col gap-2 items-center justify-center w-full",
                  isSysAdmin && "opacity-50"
                )}
              >
                {groupRoles.length === 0 && (
                  <div className="text-sm font-medium text-[#979797]">
                    {t("No groups and roles added yet")}
                  </div>
                )}
                {groupRoles.map((groupRole, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-7 gap-2 w-full group"
                  >
                    <div className="w-full col-span-3">
                      <GroupSelector
                        className="border border-[#1e293b] truncate justify-between w-full bg-[#383838] hover:bg-[#383838] h-12"
                        contentClassName="border border-[#1e293b] truncate justify-between h-[30rem]"
                        variant="ghost"
                        groups={groups ?? []}
                        selectedGroupId={groupRole.groupId}
                        onValueChange={handleGroupSelect}
                        disabled={isSysAdmin}
                        selectedGroupIndex={index}
                      />
                    </div>
                    <div className="w-full col-span-3">
                      <Select
                        onValueChange={(val) => {
                          setGroupRoles((prev) =>
                            prev.map((el, i) =>
                              i === index
                                ? {
                                    ...el,
                                    roleId: val,
                                  }
                                : el
                            )
                          );
                        }}
                        disabled={isSysAdmin}
                        defaultValue={groupRole.roleId}
                      >
                        <SelectTrigger className="border-0 bg-[#383838] px-4 text-[#F5F7FA] placeholder:text-[#98A2B3] focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-12">
                          <SelectValue placeholder={t("Select role")} />
                        </SelectTrigger>
                        <SelectContent className="bg-[#383838] text-[#F5F7FA] z-[514]">
                          {roles.length === 0 ? (
                            <div className="flex items-center justify-center h-20 text-sm text-gray-300">
                              {t("No data found")}
                            </div>
                          ) : (
                            roles.map((role: Role) => (
                              <SelectItem
                                key={role.id}
                                className="focus:bg-white/10 focus:text-white"
                                value={role.id}
                              >
                                {role.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      variant="ghost"
                      type="button"
                      className={cn(
                        "rounded  h-12 col-span-1 bg-[#FF3D00]/10 hover:bg-[#FF3D00]/10 shadow opacity-0  transition duration-700",
                        !isSysAdmin && "group-hover:opacity-100",
                        isSysAdmin && "cursor-default"
                      )}
                      onClick={() =>
                        setGroupRoles((prev) =>
                          prev.filter((_, i) => i !== index)
                        )
                      }
                    >
                      <span className="h-1 w-4 rounded bg-primary" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                type="button"
                className="w-full border-2 border-[#979797]/50 rounded border-dashed h-12"
                onClick={handleAddRole}
                disabled={isSysAdmin}
              >
                {t("Add Group and Role")}
              </Button>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <DialogClose className="" asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="px-10 first-letter:uppercase"
                  disabled={form.formState.isSubmitting}
                >
                  {t("cancel")}
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="px-10"
                disabled={form.formState.isSubmitting}
              >
                {type === "add" ? "Add User" : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </ScrollArea>
    </DialogContent>
  );
};
