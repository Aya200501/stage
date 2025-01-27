import BadgeCheck from "@/assets/icons/BadgeCheck.svg?react";
import { formatDate } from "@/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { env } from "@/lib/env";
import { cn } from "@/lib/utils";

interface VerfiedByProps {
  action?: any;
}

export const VerfiedBy = ({ action }: VerfiedByProps) => {
  if (!action)
    return (
      <div className="flex items-center gap-2 text-[#FF3D00] font-bold text-sm">
        <BadgeCheck className=" fill-[#FF3D00]" />
        Unverified
      </div>
    );

  return (
    <div className="flex items-center justify-between gap-5 w-full overflow-hidden">
      <div className="flex items-center gap-1 text-[#4CAF50] font-bold text-sm">
        <BadgeCheck className="" />
        Vérifiée{" "}
        <span className="text-[#ABBED1] text-nowrap">
          {" "}
          - {formatDate(new Date(action.createdAt))}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <Avatar
          className={cn(
            "size-6 shrink-0 transition-[width,height] duration-500"
          )}
        >
          <AvatarImage
            src={`${env.VITE_BACKEND_API}/uploads/${action.user?.image}`}
            className="rounded-full border-[0.5px] border-white"
          ></AvatarImage>
          <AvatarFallback className="bg-primary/10 font-bold">
            {action.user?.fullName.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="text-xs sm:text-sm text-[#F5F7FA] font-semibold truncate">
          {action.user.fullName.length > 20
            ? action.user.fullName.substring(0, 20) + "..."
            : action.user.fullName}
        </span>
      </div>
    </div>
  );
};
