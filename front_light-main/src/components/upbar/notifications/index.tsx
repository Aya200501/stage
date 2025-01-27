import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/Context";
import useSWR from "swr";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import useSocket from "./store";
import { toast } from "sonner";

export const Notifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const { backendApi, theme } = useGlobalContext();
  const socket = useSocket();

  const {} = useSWR(
    "/notifications",
    async () => {
      const { results } = await backendApi.findMany<any>("alert", {
        where: {
          status: "PENDING",
        },
        select: {
          id: true,
          message: true,
          status: true,
          level: true,
        },
      });
      return results;
    },
    {
      onSuccess: (data) => {
        setNotifications(data);
      },
    }
  );

  useEffect(() => {
    socket?.on("new-alert", (notification: any) => {
      setNotifications((prevNotifications) => [
        notification,
        ...prevNotifications,
      ]);
      if (notification.level === "CRITICAL") {
        toast.error(notification.message, {
          duration: 5000,
        });
      } else if (notification.level === "WARNING") {
        toast.warning(notification.message, {
          duration: 5000,
        });
      } else {
        toast.info(notification.message, {
          duration: 5000,
        });
      }
    });
    return () => {
      socket?.off("new-alert");
    };
  }, []);

  const notificationsCount = notifications.filter(
    (notification) => notification.status === "PENDING"
  ).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="size-[2rem] p-2 border border-white border-opacity-10 flex items-center justify-center">
          <Button
            size="icon"
            className="relative bg-transparent hover:bg-transparent active:bg-transparent"
          >
            <Bell className="text-black dark:text-primary-foreground" />
            <span
              className={cn(
                "absolute -top-0.5 -right-0.5 text-sm text- font-semibold flex items-center justify-center rounded-full bg-primary text-center size-4",
                notificationsCount > 9 && "size-6 -top-1 -right-1"
              )}
            >
              {notificationsCount > 9 ? "9+" : notificationsCount}
            </span>
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          theme,
          "w-72 rounded-md border bg-popover p-2 text-popover-foreground shadow-md overflow-auto max-h-[50vh] hide-scrollbar"
        )}
      >
        {notifications.length ? (
          notifications.map((notification) => (
            <Link
              to={`/alerts/`}
              className="flex-1 truncate"
              key={notification.id}
            >
              <DropdownMenuItem className={theme}>
                <DropdownMenuLabel className="capitalize flex items-center gap-2">
                  {notification.message}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
              </DropdownMenuItem>
            </Link>
          ))
        ) : (
          <DropdownMenuItem>
            <DropdownMenuLabel>No notifications</DropdownMenuLabel>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
