import { ScrollArea } from "@/components/ui/scroll-area";
import { DashboardsLinks } from "./components/dashboards-links";
import { SidebarLink } from "./components/sidebar-link";

interface SidebarContentProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filteredRoutes: any[];
}

export const SidebarContent = ({
  sidebarOpen,
  setSidebarOpen,
  filteredRoutes,
}: SidebarContentProps) => {
  return (
    <ScrollArea className="flex-1 overflow-auto" orientation="vertical">
      <DashboardsLinks
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      {filteredRoutes.map((route) => (
        <SidebarLink
          key={route.to}
          {...route}
          setSidebarOpen={setSidebarOpen}
        />
      ))}
    </ScrollArea>
  );
};
