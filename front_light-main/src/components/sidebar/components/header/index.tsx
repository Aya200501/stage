import { Logo } from "./components/logo";
import { SideBarToggle } from "./components/sidebar-toggle";

interface SidebarHeaderProps {
  sidebarOpen: boolean;
}

export const SidebarHeader = ({ sidebarOpen }: SidebarHeaderProps) => {
  return (
    <div className="mt-8 relative">
      <Logo />
      <SideBarToggle sidebarOpen={sidebarOpen} />
    </div>
  );
};
