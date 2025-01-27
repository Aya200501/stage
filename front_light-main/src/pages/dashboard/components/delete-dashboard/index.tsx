import { DashboardLayout } from "@/utils";
import { Trash2Icon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGlobalContext } from "@/Context";
import { useGridStore } from "../../utils/grid-store";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useConfirmDialog } from "@/components/confirm-dialog";
import { useSWRConfig } from "swr";
import { Button } from "@/components/ui/button";

export function DeleteDashboard() {
  const { backendApi, groupId } = useGlobalContext();
  const { setEditMode, setUpdated } = useGridStore();
  const { dashboardId } = useParams<{
    dashboardId: string;
    groupId: string;
  }>();
  const { mutate } = useSWRConfig();
  const { confirm } = useConfirmDialog();

  const navigate = useNavigate();

  const deleteDashboard = () => {
    mutate(
      `group/${groupId}/dashboards`,
      async (data: unknown) => {
        const dashboards = data as DashboardLayout[];
        if (!dashboardId) return data;
        await backendApi.DeleteById<DashboardLayout>(
          "dashboardLayout",
          dashboardId
        );
        toast.success("Dashboard deleted successfully");
        setEditMode(false);
        setUpdated(false);
        navigate("/dashboards");
        return dashboards.filter((item) => item.id !== dashboardId);
      },
      {
        revalidate: false,
      }
    );
  };

  if (!dashboardId) return null;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              confirm({
                onConfirm: deleteDashboard,
              });
            }}
          >
            <Trash2Icon size={16} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side={"bottom-end" as unknown as "bottom"}>
          Delete dashboard
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
