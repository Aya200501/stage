import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Route } from "@/components/sidebar/utils/routes";
export const SidebarLink = ({
  to,
  Icon,
  name,
  setSidebarOpen,
}: Route & {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const isActive = pathname === to;
  return (
    <Link
      to={to}
      onClick={() => {
        if (window.innerWidth <= 1024 && setSidebarOpen) {
          setSidebarOpen(false);
        }
      }}
      className={cn(
        "flex items-center py-2 max-w-full overflow-hidden hover:text-primary",
        {
          "text-primary": isActive,
        }
      )}
    >
      <div className="w-16 flex justify-center shrink-0 ">
        <Icon size={20} strokeWidth={2.5} />
      </div>
      <span className="opacity-75 capitalize font-semibold whitespace-nowrap">
        {t(name)}
      </span>
    </Link>
  );
};
