import { useGlobalContext } from "@/Context";
import React, { useCallback, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { env } from "@/lib/env";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import UpdateUserDialog from "./components/updateUser";
import { User } from "@/utils";
import { EditIcon, LogOut } from "lucide-react";
import { useSWRConfig } from "swr";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom";

interface UserButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebarOpen: boolean;
}

export default function UserButton({ sidebarOpen }: UserButtonProps) {
  const {
    user,
    backendApi,
    setAccessToken,
    setRefreshToken,
    setUser: setMe,
    refreshToken,
    setGroupId,
  } = useGlobalContext();
  const { mutate } = useSWRConfig();
  const navigate = useNavigate();

  const [users, setUser] = useState<User | "new" | null>(null);
  const onClose = useCallback(() => {
    setUser(null);
    mutate(async () => {
      const { results } = await backendApi.findMany<User>("user");
      return results;
    });
  }, [mutate, backendApi]);
  const handleLogout = async () => {
    backendApi.signOut(refreshToken).then(() => {
      setAccessToken("");
      setRefreshToken("");
      setGroupId("");
      navigate("/", { replace: true });
      setMe(null);
    });
  };
  return (
    <div
      className={cn(
        "flex items-center p-2 transition-[padding,background-color] max-w-ful overflow-hidden pl-0 rounded-lg bg-transparent",
        {
          "bg-foreground/5 pl-2": sidebarOpen,
        }
      )}
    >
      <Popover>
        <PopoverTrigger className="w-full flex">
          <Avatar
            className={cn(
              "size-9 shrink-0 transition-[width,height] duration-500",
              {
                "size-10": sidebarOpen,
              }
            )}
          >
            <AvatarImage
              src={`${env.VITE_BACKEND_API}/uploads/${user?.image}`}
            ></AvatarImage>
            <AvatarFallback className="bg-primary/10 font-bold">
              {user?.fullName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col pl-3 text-left">
            <span className="text-sm font-bold whitespace-nowrap">
              {user?.fullName}
            </span>
            <span className="text-[10px] opacity-75 whitespace-nowrap">
              {user?.email}
            </span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-44 flex flex-col gap-2 z-[502]">
          <Button
            variant="ghost"
            className="flex gap-4 justify-start"
            onClick={() => setUser(user as User)}
          >
            <EditIcon size={18} />
            Edit Profil
          </Button>
          <Button
            variant="ghost"
            className="flex gap-4 justify-start"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Log Out
          </Button>
        </PopoverContent>
      </Popover>
      <UpdateUserDialog user={users} onClose={onClose} />
    </div>
  );
}
