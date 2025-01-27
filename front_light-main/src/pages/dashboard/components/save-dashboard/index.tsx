import { DashboardLayout } from "@/utils";
import { Save } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSWRConfig } from "swr";
import { AxiosError } from "axios";
import { useGlobalContext } from "@/Context";
import { useGridStore } from "../../utils/grid-store";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function SaveDashboard() {
  const { backendApi, groupId } = useGlobalContext();
  const { mutate } = useSWRConfig();
  const { isUpdated, layouts, widgets, setEditMode, setUpdated } =
    useGridStore();
  const { dashboardId } = useParams<{
    dashboardId: string;
  }>();

  const save = async () => {
    if (!dashboardId) return;

    const res = await backendApi.update<DashboardLayout>(
      "dashboardLayout",
      dashboardId,
      {
        data: {
          layouts,
          widgets,
        },
      }
    );
    toast.success("Dashboard updated successfully");
    setEditMode(false);
    setUpdated(false);

    return res;
  };

  const handleSave = async () => {
    mutate(`${groupId}/dashboard/${dashboardId}`, save, {
      rollbackOnError: (error) => {
        if (error instanceof AxiosError && error.response?.status === 409) {
          toast.error("conflict");
        } else {
          toast.error("Something went wrong");
        }
        return true;
      },
    });
  };
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            disabled={!isUpdated}
            variant="ghost"
            size="icon"
            className={cn("", {
              "text-foreground": isUpdated,
              "text-gray-500/50 pointer-events-none": !isUpdated,
            })}
            onClick={handleSave}
          >
            <Save size={20} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side={"bottom-end" as unknown as "bottom"}>
          Save
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
