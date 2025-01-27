import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/Context";
import { cn } from "@/lib/utils";
import { useAlertStore } from "../../../store";
import { memo } from "react";
import { AlertType } from "@/utils";

interface ChangeAlertStatusButtonProps {
  label: string;
  alertId: string;
  newStatus: string;
  className?: string;
  onClick?: (newStatus: string) => void;
}

export const ChangeAlertStatusButton = memo(
  ({
    label,
    alertId,
    newStatus,
    className = "",
    onClick,
  }: ChangeAlertStatusButtonProps) => {
    const { backendApi } = useGlobalContext();
    const updateItem = useAlertStore((state) => state.updateItem);

    const handleClick = async () => {
      try {
        const newAlert: AlertType = await backendApi.update(
          "alert",
          alertId,
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
        updateItem(newAlert);
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <Button
        className={cn(
          "focus-visible:ring-0 focus-visible:ring-offset-0 2xl:text-sm w-full",
          label === "Acknowledge" && "bg-[#4CAF50]/75 hover:bg-[#4CAF50]/50",
          label === "Reject" && "bg-[#FF3D00]/75 hover:bg-[#FF3D00]/50",
          className
        )}
        onClick={() => {
          if (onClick) {
            onClick(newStatus);
          } else {
            handleClick();
          }
        }}
      >
        {label}
      </Button>
    );
  }
);
