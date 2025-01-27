import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

import React from "react";
import { Link } from "react-router-dom";

interface SidebarSectionProps {
  section: {
    icon: React.FC<React.SVGProps<SVGSVGElement>> | LucideIcon;
    title: string;
    path: string;
    iconType?: string;
  };
  pathname: string;
}

export const SidebarSection = ({ section, pathname }: SidebarSectionProps) => {
  const { icon: Icon, title, path, iconType } = section;
  const isActive =
    pathname === path || (path !== "/" && pathname.includes(path));

  return (
    <Link
      to={path}
      className={cn(
        "flex cursor-pointer items-center justify-start gap-2.5 pl-1 transition-all duration-700  ease-in-out [&>span]:opacity-50",
        isActive && "text-[#D22627] [&>span]:opacity-100"
      )}
    >
      <Icon
        className={cn(
          "h-4 w-4",
          isActive && iconType === "fill" && "fill-current",
          isActive && iconType === "stroke" && "stroke-current"
        )}
        style={{
          strokeWidth: "2.5px",
        }}
      />
      <span className="text-sm font-semibold">{title}</span>
    </Link>
  );
};
