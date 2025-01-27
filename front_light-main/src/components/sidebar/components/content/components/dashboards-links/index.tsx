import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import useSWR from "swr";
import { Group } from "@/utils";
import { useGlobalContext } from "@/Context";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { LayoutDashboardIcon, PlusIcon } from "lucide-react";
import { AddDashBoardButton } from "@/pages/dashboard/components/add-dashboard-button";
import { useTranslation } from "react-i18next";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const DashboardsLinks = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { t } = useTranslation();
  const { backendApi, groupId, user } = useGlobalContext();
  const { dashboardId } = useParams<{ dashboardId: string }>();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(pathname.includes("dashboards"));
  const navigate = useNavigate();

  const currentRole = user?.roles.find((role) => role.groupId === groupId);

  const isAdmin = user?.isSuperAdmin || currentRole?.role.name === "ADMIN";

  const toggle = () => setOpen((prev) => !prev);

  const params = {
    select: {
      dashboardLayouts: {
        where: isAdmin ? {} : { users: { some: { id: user?.id } } },
      },
    },
  };

  const { data, isLoading, error } = useSWR(
    `group/${groupId}/dashboards`,
    async () => {
      const result = await backendApi.FindById<Group>(
        "group",
        groupId as string,
        params
      );
      return result?.dashboardLayouts || [];
    }
  );
  const dashboards = data || [];

  useEffect(() => {
    if (dashboards.length && pathname.includes("dashboards") && !dashboardId) {
      navigate(`dashboards/${dashboards[0].id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardId, pathname, dashboards]);

  return (
    <>
      <div
        className={cn(
          "flex relative items-center pr-3 w-full max-w-full overflow-hidden hover:text-primary",
          {
            "text-primary": pathname.includes("dashboards"),
          }
        )}
      >
        <div
          role="button"
          onClick={toggle}
          className="flex flex-1 h-full py-1.5 relative"
        >
          {!sidebarOpen && (
            <Popover>
              <PopoverTrigger className="absolute inset-0 "></PopoverTrigger>
              <PopoverContent side="right" sideOffset={-64} align="start">
                <div
                  className={cn(
                    "transition-[grid-template-rows]  flex-col grid grid-rows-[1fr]  duration-500 px-4  ease-in-out",
                    {
                      "grid grid-rows-[0fr]": isLoading || error,
                    }
                  )}
                >
                  <div className="flex flex-col overflow-hidden">
                    {dashboards.map((item) => (
                      <Link
                        onClick={() => {
                          if (window.innerWidth <= 1024) {
                            setSidebarOpen(false);
                          }
                        }}
                        to={`dashboards/${item.id}`}
                        key={item.id}
                        className={cn(
                          "flex item-center capitalize font-semibold opacity-75  gap-2 hover:text-primary   pr-2 py-2 ",
                          {
                            "text-primary": dashboardId === item.id,
                          }
                        )}
                      >
                        <span className="truncate whitespace">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                  {dashboards.length === 0 && (
                    <AddDashBoardButton
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      variant="ghost"
                      className="capitalize"
                    >
                      {t("add")} {t("dashboard")}
                    </AddDashBoardButton>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          )}

          <div className="w-16 flex justify-center shrink-0 ">
            <LayoutDashboardIcon size={20} strokeWidth={2.5} />
          </div>
          <span className="opacity-75  capitalize font-semibold whitespace-nowrap">
            {t("dashboard")}
          </span>
        </div>
        <AddDashBoardButton
          onClick={(e) => {
            e.stopPropagation();
          }}
          variant="ghost"
          className="ml-auto"
          size={"icon"}
        >
          <PlusIcon size={20} strokeWidth={2.5} />
        </AddDashBoardButton>
      </div>

      <div
        className={cn(
          "transition-[grid-template-rows]  flex-col grid grid-rows-[1fr]  duration-500 px-4  ease-in-out",
          {
            "grid grid-rows-[0fr]": !open || !sidebarOpen || isLoading || error,
          }
        )}
      >
        <div className="flex flex-col overflow-hidden">
          {dashboards.map((item) => (
            <Link
              onClick={() => {
                if (window.innerWidth <= 1024) {
                  setSidebarOpen(false);
                }
              }}
              to={`dashboards/${item.id}`}
              key={item.id}
              className={cn(
                "flex item-center capitalize font-semibold opacity-75  gap-2 hover:text-primary   pr-2 py-2 pl-8",
                {
                  "text-primary": dashboardId === item.id,
                }
              )}
            >
              <span className="truncate whitespace">{item.name}</span>
            </Link>
          ))}
          {dashboards.length === 0 && (
            <AddDashBoardButton
              onClick={(e) => {
                e.stopPropagation();
              }}
              variant="ghost"
              className="capitalize"
            >
              {t("add")} {t("dashboard")}
            </AddDashBoardButton>
          )}
        </div>
      </div>
    </>
  );
};
