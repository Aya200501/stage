/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ImagePlusIcon, SaveIcon, Undo2Icon } from "lucide-react";
import { User } from "@/utils";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { useGlobalContext } from "@/Context";
import { toast } from "sonner";
import { env } from "@/lib/env";
import { useTranslation } from "react-i18next";

export interface UpdateUserDialogProps {
  user: User | "new" | null;
  onClose: () => void;
}

export default function UpdateUserDialog({
  user,
  onClose,
}: UpdateUserDialogProps) {
  const { t } = useTranslation();
  const { backendApi, user: me } = useGlobalContext();
  const [userGroup, setUserGroup] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  useEffect(() => {
    const userGrp = me?.roles?.map((dt: any) => dt.groupId)[0];
    setUserGroup(userGrp);
  }, [me, userGroup]);

  useEffect(() => {
    if (user && user !== "new") {
      setCurrentImage(user.image || null);
    } else {
      setCurrentImage(null);
    }
  }, [user]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData();
    const email = form.email.value;

    try {
      const emailCheckParams = {
        where: { email },
        select: { id: true },
      };
      // const emailCheckKey = `user?${JSON.stringify(emailCheckParams)}`;
      const emailExistsResponse = await backendApi.findMany<User>(
        "user",
        emailCheckParams
      );
      const emailExists = emailExistsResponse.results;

      if (
        emailExists.length > 0 &&
        (user === "new" || emailExists[0].id !== user?.id)
      ) {
        toast.error(
          "Email already exists. Please use a different email address."
        );
        return;
      }

      formData.append("fullName", form.fullName.value);
      formData.append("email", email);
      formData.append("password", form?.password.value);

      if (file) {
        formData.append("image", file);
      }

      let result;
      if (user === "new") {
        result = await backendApi.create("user", formData);
      } else if (user) {
        result = await backendApi.update("user", user.id, formData);
        console.log(result);
      } else {
        throw new Error("User is null when attempting to update.");
      }

      onClose();
      toast.success("User saved successfully.");
    } catch (error) {
      toast.error(t("an error occurred. Please try again later."));
    }
  };

  return (
    <Dialog
      open={!!user}
      onOpenChange={(open) => {
        if (!open) {
          setFile(null);
          onClose();
        }
      }}
    >
      <DialogContent className="w-full text-sm max-w-screen-sm max-h-[100svh] overflow-auto">
        <DialogHeader className="dark:text-white">
          <DialogClose className="absolute top-0 right-0 m-4" />
          <DialogTitle>{user === "new" ? "Add" : "Edit"} User</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex flex-col gap-2">
          <div className="flex gap-4">
            <div className="w-full">
              <div className="mt-2 relative h-56 w-56 overflow-hidden rounded-lg border-2 border-dashed">
                <label htmlFor="map" role="button">
                  {file ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="map"
                      className="w-full h-full object-cover"
                    />
                  ) : currentImage ? (
                    <img
                      src={`${env.VITE_BACKEND_API}/uploads/${currentImage}`}
                      alt="map"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-content-center opacity-25 hover:opacity-50 bg-gray-500/10">
                      <ImagePlusIcon size={96} />
                    </div>
                  )}
                </label>
                <input
                  name="mapFile"
                  id="map"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      setFile(f);
                    }
                  }}
                  hidden
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <Label className="mt-4 inline-block">Name</Label>
              <Input
                className="bg-transparent"
                type="text"
                name="fullName"
                required
                defaultValue={user && user !== "new" ? user.fullName : ""}
              />
              <Label className="mt-4 inline-block">Email</Label>
              <Input
                className="bg-transparent"
                type="email"
                name="email"
                required
                defaultValue={user && user !== "new" ? user.email : ""}
              />
              <Label className="mt-4 inline-block">Password</Label>
              <Input
                className="bg-transparent"
                type="password"
                name="password"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-4">
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
