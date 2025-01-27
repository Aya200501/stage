import { useGlobalContext } from "@/Context";
import { Button, ButtonProps } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { env } from "@/lib/env";
import { cn } from "@/lib/utils";
import { DashboardLayout, User } from "@/utils";
import { DialogClose } from "@radix-ui/react-dialog";
import { AxiosError } from "axios";
import { ElementRef, forwardRef, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useSWR, { useSWRConfig } from "swr";

interface Props extends ButtonProps {}

export const AddDashBoardButton = forwardRef<HTMLButtonElement, Props>(
  ({ className, disabled, ...props }, ref) => {
    const { t } = useTranslation();
    const { backendApi, groupId, currentGroup } = useGlobalContext();
    const navigate = useNavigate();
    const { mutate } = useSWRConfig();
    const closeRef = useRef<ElementRef<"button">>(null);
    const [userIds, setUserIds] = useState<string[]>([]);

    const closeModal = () => {
      closeRef.current?.click();
    };

    const { data, isLoading, error } = useSWR(
      `group-users/${groupId}`,
      async () => {
        const { results } = await backendApi.findMany<User>("user", {
          where: { roles: { some: { groupId } } },
          select: { id: true, image: true, fullName: true },
        });
        return results;
      }
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const name = formData.get("name") as string;

      if (!name) {
        toast.error("Name is required");
        return;
      }

      try {
        const { id } = await backendApi.create<DashboardLayout>(
          "dashboardLayout",
          { name: name, groupId, users: userIds }
        );
        mutate(`group/${groupId}/dashboards`);
        toast.success("Dashboard added successfully");
        navigate(`/dashboards/${id}`);
        closeModal();
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 409) {
          toast.error("Dashboard with this name already exists");
        } else {
          toast.error("Something went wrong");
        }
      }
    };

    return (
      <Dialog
        onOpenChange={(open) => {
          if (!open) {
            setUserIds([]);
          }
        }}
      >
        <DialogTrigger asChild ref={ref}>
          <Button
            disabled={disabled || !currentGroup?.id}
            className={cn("gap-2", className)}
            {...props}
          />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="font-semibold flex flex-row gap-1">
            <span className="first-letter:uppercase">{t("add")}</span>{" "}
            {t("dashboard")}
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <Label className="first-letter:uppercase" htmlFor="name">
              {t("label")}
            </Label>
            <Input id="name" name="name" />
            <div className="flex items-center justify-end gap-4 pb-2 [&>*]:w-20">
              <Button onClick={closeModal} variant="outline" type="button">
                <span className="first-letter:uppercase">{t("cancel")}</span>
              </Button>
              <Button type="submit">
                {" "}
                <span className="first-letter:uppercase">{t("add")}</span>
              </Button>
            </div>
            <div className="flex justify-between items-center">
              <Label className="first-letter:uppercase" htmlFor="users">
                {t("users")}
              </Label>
              <div className="grid place-content-center pr-4">
                <Label className="flex gap-2 items-center" role="button">
                  <span className="first-letter:uppercase">{t("all")}</span>
                  <Checkbox
                    id="users"
                    checked={!!data?.length && userIds.length === data?.length}
                    onCheckedChange={(val) => {
                      setUserIds(val ? data?.map((user) => user.id) ?? [] : []);
                    }}
                  />
                </Label>
              </div>
            </div>
            {isLoading ? (
              <div>{t("loading")}</div>
            ) : (
              <ScrollArea className="max-h-[20rem]">
                <div className="flex flex-col gap-1">
                  {data?.map((user) => (
                    <label
                      role="button"
                      htmlFor={user.id}
                      key={user.id}
                      className="flex items-center rounded-md bg-foreground/5 px-2 [&>*]:p-1.5 hover:bg-foreground/10 transition-colors"
                    >
                      <div className="flex items-center">
                        {user.image ? (
                          <img
                            src={`${env.VITE_BACKEND_API}/uploads/${user.image}`}
                            alt={`${user.fullName}'s profile`}
                            className="h-10 w-10 rounded-full"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            N/A
                          </div>
                        )}
                      </div>
                      <div className=" w- flex-1">{user.fullName}</div>
                      <div className="w-8 shrink-0 grid place-content-center">
                        <Checkbox
                          id={user.id}
                          value={user.id}
                          checked={userIds.includes(user.id)}
                          onCheckedChange={(val) => {
                            setUserIds((ids) => {
                              if (val) {
                                return [...ids, user.id];
                              } else {
                                return ids.filter((id) => id !== user.id);
                              }
                            });
                          }}
                        />
                      </div>
                    </label>
                  ))}
                </div>
              </ScrollArea>
            )}
            {error && <div>{t("somethingError")}</div>}
          </form>
          <DialogClose ref={closeRef} hidden />
        </DialogContent>
      </Dialog>
    );
  }
);
