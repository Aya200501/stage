import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckIcon, SaveIcon, Undo2Icon } from "lucide-react";
import { Role, colors, models, permissions } from "@/utils";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useGlobalContext } from "@/Context";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { useRoles } from "../store";

export interface AddEditRoleDialogProps {
  role: Role | "new" | null;
  onClose: () => void;
}

export default function AddEditRoleDialog({
  role,
  onClose,
}: AddEditRoleDialogProps) {
  const { t } = useTranslation();
  const { backendApi } = useGlobalContext();
  const [selectedColor, setSelectedColor] = React.useState<string>(colors[0]);
  const [abilities, setAbilities] = React.useState<Record<string, string>>({
    DASHBOARD: "READ",
  });
  const { items, setItems } = useRoles();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;

    try {
      if (role === "new") {
        const result: Role = await backendApi.create(
          "role",
          {
            name: name.toLocaleUpperCase(),
            color: selectedColor,
            abilities: Object.entries(abilities)
              .map(([key, value]) => ({
                model: key,
                permission: value,
              }))
              .filter(({ permission }) => permission !== "NONE"),
          },
          { include: { abilities: true } }
        );
        toast.success("Role created successfully");
        setItems([result, ...items]);
        onClose();
      } else if (role instanceof Object) {
        const result: Role = await backendApi.update(
          "role",
          role.id,
          {
            name: name.toLocaleUpperCase(),
            color: selectedColor,
            abilities: Object.entries(abilities)
              .map(([key, value]) => ({
                model: key,
                permission: value,
              }))
              .filter(({ permission }) => permission !== "NONE"),
          },
          { include: { abilities: true } }
        );
        toast.success("Role updated successfully");
        setItems(items.map((r) => (r.id === role.id ? result : r)));
        onClose();
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        toast.error(error.response.data?.message);
        return true;
      }
      toast.error(t("an error occurred"));
    }
  };

  const setAllRoleToPermission = (permission: string) => {
    if (permission === "NONE") {
      setAbilities({
        DASHBOARD: "READ",
      });
      return;
    }
    if (permission === "ALL") {
      setAbilities(
        models
          .filter((el) => el.name !== "WORKFLOW")
          .reduce(
            (acc, model) => ({
              ...acc,
              [model.name]: permission,
            }),
            {}
          )
      );
      return;
    }
    if (permissions.find((item) => item.name === permission)) {
      setAbilities(
        models
          .filter((el) => el.name !== "WORKFLOW")
          .reduce(
            (acc, model) => ({
              ...acc,
              [model.name]: permission,
            }),
            {}
          )
      );
    }
  };

  useEffect(() => {
    setAbilities(
      role instanceof Object
        ? role.abilities.reduce(
            (acc, { model, permission }) => ({
              ...acc,
              [model]: permission,
            }),
            {}
          )
        : {
            DASHBOARD: "READ",
          }
    );
    if (role && role instanceof Object && role.color) {
      setSelectedColor(
        role && role instanceof Object && role.color ? role.color : colors[0]
      );
    }
  }, [role]);

  return (
    <Dialog
      open={!!role}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent className="w-full text-sm max-w-screen-sm max-h-[100svh] overflow-auto ">
        <DialogHeader className="dark:text-white">
          <DialogClose className="absolute top-0 right-0 m-4" />
          <DialogTitle>
            {role === "new" ? t("add") : t("edit")} Role
          </DialogTitle>
        </DialogHeader>
        <form className="flex flex-col " onSubmit={handleSubmit}>
          <div className="">
            <h3 className="text-base font-semibold mt-4">Display</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  name="name"
                  defaultValue={role && role instanceof Object ? role.name : ""}
                />
              </div>
              <div className="space-y-2">
                <Label className="first-letter:uppercase">{t("color")}</Label>
                <div className="grid grid-cols-[repeat(9,1.4rem)] auto-rows-[1.4rem] gap-2  [&>*]:rounded">
                  <div
                    className="row-span-2 col-span-2 grid place-items-center transition-colors"
                    style={{ backgroundColor: selectedColor }}
                  >
                    <CheckIcon size={32} />
                  </div>
                  {colors.map((color, index) => (
                    <button
                      type="button"
                      key={index}
                      className="rounded-full cursor-pointer hover:scale-110 hover:rotate-6 active:scale-90 transition-transform duration-300"
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <h3 className="text-base flex justify-end px-2 py-2 mt-6">
              <span className="mr-auto font-semibold first-letter:uppercase ">
                {t("abilities")}
              </span>
              <div className="flex [&_*]:w-20  divide-x">
                {permissions.map((item, index) => {
                  return (
                    <button
                      className="mr-auto text-center"
                      type="button"
                      key={index}
                      onClick={() => setAllRoleToPermission(item.name)}
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>
            </h3>
            <div className="flex flex-col gap-2">
              {models
                .filter((el) => el.name !== "WORKFLOW")
                .map((model, index) => {
                  return (
                    <div
                      key={index}
                      className="flex justify-end  bg-gray-500/5 py-1.5 px-2 rounded"
                    >
                      <span className="mr-auto">{model.name}</span>
                      <RadioGroup
                        name={model.name}
                        className="flex [&>*]:w-20  divide-x gap-0"
                        value={abilities[model.name] || "NONE"}
                        onValueChange={(value) => {
                          setAbilities((prev) => ({
                            ...prev,
                            [model.name]: value,
                          }));
                        }}
                      >
                        {permissions.map((item, index) => {
                          return (
                            <div className="!flex justify-center" key={index}>
                              <RadioGroupItem
                                value={item.name}
                                disabled={
                                  model.name === "DASHBOARD" &&
                                  item.name === "NONE"
                                }
                              />
                            </div>
                          );
                        })}
                      </RadioGroup>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="flex justify-end [&>button]:w-24  [&>button]:gap-2 gap-4 mt-4">
            <Button size="sm" variant="outline" onClick={onClose} type="button">
              <Undo2Icon size={16} />
              <span className="first-letter:uppercase">{t("cancel")}</span>
            </Button>
            <Button size="sm" type="submit">
              <SaveIcon size={16} />
              <span className="first-letter:uppercase">{t("save")}</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
