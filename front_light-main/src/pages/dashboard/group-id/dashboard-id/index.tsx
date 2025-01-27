import useSWR, { mutate, SWRConfig } from "swr";
import { useGridStore } from "../../utils/grid-store";
import { useGlobalContext } from "@/Context";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardLayout, getPermissionLevel } from "@/utils";
import { ToggleEdit } from "../../components/toggle-edit";
import { SaveDashboard } from "../../components/save-dashboard";
import AddWidget from "../../components/add-widget";
import { useEffect, useMemo, useRef, useState } from "react";
import { DeleteDashboard } from "../../components/delete-dashboard";
import { Grid } from "../../components/grid";
import { Button } from "@/components/ui/button";
import { CheckIcon, Edit2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import AddWidgetDialog from "../../components/add-widget-dialog";
import SelectDateRange from "../../components/select-date-range";
import { useTranslation } from "react-i18next";

export default function DashboardIdPage() {
  const { t } = useTranslation();
  const { setLayouts, setWidgets, setUpdated, setEditMode } = useGridStore();
  const formRef = useRef<HTMLFormElement>(null);
  const [editName, setEditName] = useState(false);
  const { backendApi, groupId, user } = useGlobalContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const { dashboardId } = useParams<{
    dashboardId: string;
  }>();
  const navigate = useNavigate();

  const permissionLevel = useMemo(
    () => getPermissionLevel(user, "DASHBOARD", groupId),
    [user, groupId]
  );

  const currentRole = user?.roles.find((role) => role.groupId === groupId);

  const canEdit = permissionLevel >= 2;

  const canDelete = permissionLevel == 3;

  const isAdmin = user?.isSuperAdmin || currentRole?.role.name === "ADMIN";

  const params = useMemo(() => {
    return {
      where: {
        id: dashboardId,
        groupId,
        users: isAdmin ? undefined : { some: { id: user?.id } },
      },
    };
  }, [dashboardId, groupId, isAdmin, user]);

  const key = `/dashboard/${JSON.stringify(params)}`;
  const { data, isLoading, error } = useSWR(
    `/dashboard/${JSON.stringify(params)}`,
    async () => {
      if (!dashboardId) return;
      const { results } = await backendApi.findMany<DashboardLayout>(
        "dashboardLayout",
        params
      );
      return results[0];
    },
    {
      onSuccess: (data) => {
        if (!data) {
          setTimeout(() => {
            navigate("/dashboards");
          }, 0);
          return;
        }
        setLayouts(data?.data.layouts || []);
        setWidgets(data?.data.widgets || []);
        setUpdated(false);
        setEditMode(false);
      },
    }
  );

  useEffect(() => {
    if (isLoading || error) {
      setUpdated(false);
      setEditMode(false);
      setLayouts([]);
      setWidgets([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, error]);

  // TODO: add skeleton page
  if (isLoading) return <div>{t("loading")}</div>;

  // TODO: add error page
  if (error) return <div>Error: {error.message}</div>;

  if (!data) {
    return (
      <div>
        <button onClick={() => navigate(-1)}>Back</button>
        <p>Dashboard with id: {dashboardId} not found. Please select another</p>
      </div>
    );
  }

  const enableEditName = () => {
    setEditName(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    if (name === data.name) {
      setEditName(false);
      return;
    }
    mutate(
      key,
      async (data: unknown) => {
        const dashboard = data as DashboardLayout;
        if (!dashboardId) return dashboard;
        try {
          await backendApi.update<DashboardLayout>(
            "dashboardLayout",
            dashboardId,
            { name }
          );
        } catch (error) {
          toast.error("Failed to update dashboard name");
          return dashboard;
        }
        setEditName(false);
        toast.success("Dashboard name updated successfully");
        mutate(
          `group/${groupId}/dashboards`,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          async (data: unknown) => {
            const dashboards = data as DashboardLayout[];
            return dashboards.map((d) => {
              if (d.id === dashboardId) {
                return { ...d, name };
              }
              return d;
            });
          },
          { revalidate: false }
        );
        return { ...dashboard, name };
      },
      {
        revalidate: false,
        optimisticData: {
          ...data,
          name,
        },
      }
    );
  };
  return (
    <SWRConfig
      value={{
        refreshInterval: 10_000,
      }}
    >
      <main className="h-full flex-1 flex flex-col ">
        <div className="flex flex-wrap items-center gap-1   w py-2">
          <div className="flex gap-4 items-center ">
            {canEdit && editName ? (
              <form
                onKeyDown={(e) => e.key === "Escape" && setEditName(false)}
                onSubmit={handleSubmit}
                className="flex items-center gap-4"
                ref={formRef}
                onBlur={() => {}}
              >
                <Input
                  type="text"
                  defaultValue={data.name}
                  className="w-40"
                  name="name"
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setEditName(false);
                    }
                  }}
                  ref={inputRef}
                />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <CheckIcon size={18} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{t("save")} dashboard name</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </form>
            ) : (
              <>
                <span className="font-semibold  text-lg min-w-40 capitalize">
                  {data.name}
                </span>
                {canEdit && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={enableEditName}
                        >
                          <Edit2Icon size={18} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Edit dashboard name</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </>
            )}
          </div>
          {canDelete && <DeleteDashboard />}
          <SelectDateRange className="ml-auto " />
          {canEdit && (
            <div className="flex gap-1 items-center ml-auto">
              <AddWidget />
              <ToggleEdit />
              <SaveDashboard />
            </div>
          )}
        </div>
        <Grid />
        <AddWidgetDialog />
      </main>
    </SWRConfig>
  );
}
