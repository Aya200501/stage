import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";

export function SideBarToggle({ sidebarOpen }: { sidebarOpen: boolean }) {
  return (
    <label
      htmlFor="sidebar-toggle"
      role="button"
      className={cn(
        "dark absolute right-0 bottom-1/2 translate-y-1/2 p-2 rounded-lg transition-[transform,background-color] duration-500",
        {
          "lg:bg-card lg:text-card-foreground  lg:translate-x-3/4 ":
            !sidebarOpen,
          "-translate-x-1/4 hover:bg-background/5": sidebarOpen,
        }
      )}
    >
      <MenuIcon size={18} />
    </label>
  );
}
