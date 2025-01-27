import { MenuIcon } from "lucide-react";

export function SideBarToggle() {
  return (
    <label
      htmlFor="sidebar-toggle"
      role="button"
      className=" rounded hover:bg-foreground/5 active:bg-foreground/10 size-9 grid place-items-center lg:hidden"
    >
      <MenuIcon size={22} />
    </label>
  );
}
