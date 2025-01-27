import { memo, useMemo, useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/Context";
import { toast } from "sonner";
import { AlertDetailsHeader } from "./components/header";
import { AlertScreenshot } from "./components/screenshot";
import { AlertInfo } from "./components/alert-info";
import { CommentList } from "./components/comment-list";
import { useAlertStore } from "../../store";
import { useAlertDetailsDrawer } from "./store";
import { ChangeAlertStatusButton } from "../alert-table/change-alert-status-button";
import { VerfiedBy } from "./components/verified-by";
import { AlertAction, AlertType } from "@/utils";

export const AlertDetails = memo(() => {
  const { backendApi, user } = useGlobalContext();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const onClose = useAlertDetailsDrawer((state) => state.close);
  const isOpen = useAlertDetailsDrawer((state) => state.isOpen);
  const setAlert = useAlertDetailsDrawer((state) => state.setAlert);
  const alert = useAlertDetailsDrawer((state) => state.alert);
  const updateAlert = useAlertStore((state) => state.updateItem);

  const comments = useMemo(() => {
    if (!alert) return [];
    return alert.actions.filter(
      (action: AlertAction) => action.type === "NEW_COMMENT"
    );
  }, [alert]);

  const verfiedBy = useMemo(() => {
    if (!alert) return null;
    return alert.actions.find(
      (action: AlertAction) =>
        action.type === "RESOLVED" || action.type === "DISMISSED"
    );
  }, [alert]);

  if (!alert) return null;

  const handleAddComment = async () => {
    const content = textAreaRef.current?.value || "";
    try {
      const validComment = content.trim();
      if (!validComment || !user?.id || !alert) return;

      const newComment: AlertAction = await backendApi.create(
        "alertAction",
        {
          alertId: alert.id,
          content: validComment,
          type: "NEW_COMMENT",
        },
        {
          select: {
            id: true,
            content: true,
            createdAt: true,
            type: true,
            user: {
              select: {
                id: true,
                fullName: true,
                image: true,
              },
            },
          },
        }
      );

      const updatedAlert: AlertType = {
        ...alert,
        actions: [...alert.actions, newComment],
      };

      updateAlert(updatedAlert);
      setAlert(updatedAlert);
      textAreaRef.current!.value = "";
    } catch (error) {
      toast.error("Failed to add comment");
    }
  };

  const handleClose = () => {
    textAreaRef.current!.value = "";
    onClose();
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      const newAlert: AlertType = await backendApi.update(
        "alert",
        alert.id,
        {
          status: newStatus,
        },
        {
          include: {
            workflow: {
              select: {
                cameraAnalyse: {
                  select: {
                    name: true,
                    camera: {
                      select: {
                        name: true,
                        id: true,
                      },
                    },
                  },
                },
              },
            },
            actions: {
              select: {
                id: true,
                content: true,
                createdAt: true,
                type: true,
                user: {
                  select: {
                    id: true,
                    fullName: true,
                    image: true,
                  },
                },
              },
            },
          },
        }
      );
      updateAlert(newAlert);
      setAlert(newAlert);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="rounded-l-2xl border-l border-[#B3B5BD]/70  shadow-[0px_3px_16px_10px_rgba(10,13,16,0.20)] backdrop-blur-[10px] text-white sm:max-w-lg flex flex-col gap-2 px-2  bg-card">
        <AlertDetailsHeader
          name={alert.name}
          status={alert.status}
          onClose={close}
        />

        <ScrollArea className="h-full px-3 pb-3 [&>*]:max-w-full">
          <div className="flex flex-col gap-4 w-full ">
            {alert?.details?.sceenshot && (
              <AlertScreenshot src={alert.details.sceenshot} />
            )}

            <AlertInfo alert={alert} />
            <VerfiedBy action={verfiedBy} />
            {(alert.status === "ACTIVE" || alert.status === "PENDING") && (
              <div className="w-full grid grid-cols-2 gap-4 font-semibold text-white ">
                <ChangeAlertStatusButton
                  label="Acknowledge"
                  alertId={alert.id}
                  newStatus="RESOLVED"
                  className="!w-full py-5"
                  onClick={handleStatusChange}
                />
                <ChangeAlertStatusButton
                  label="Reject"
                  alertId={alert.id}
                  newStatus="DISMISSED"
                  className="!w-full py-5"
                  onClick={handleStatusChange}
                />
              </div>
            )}

            <div className="flex flex-col gap-[8px] min-h-[124px] px-1 pb-2">
              <h3 className="text-base font-medium text-[#F5F7FA]">
                Commentaires
                <span className="ml-2 text-sm font-normal">(Optionnel)</span>
              </h3>
              <CommentList comments={comments} />
              <Textarea
                placeholder="Ajouter un commentaire"
                className="bg-transparent border-[0.5px] border-white/10 placeholder:text-[#ABBED1] focus-visible:ring-0 focus-visible:ring-offset-2"
                ref={textAreaRef}
              />
            </div>
          </div>
        </ScrollArea>

        <SheetFooter className="flex flex-row items-center justify-between gap-4 w-full sm:justify-between px-3">
          <SheetClose asChild>
            <Button
              variant="ghost"
              className="px-8 font-medium capitalize hover:bg-white/10"
            >
              cancel
            </Button>
          </SheetClose>
          <Button
            className="px-8 font-medium capitalize"
            onClick={handleAddComment}
          >
            save
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
});
