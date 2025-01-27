// import "react-grid-layout/css/styles.css";
// import "react-resizable/css/styles.css";
import { Scaling } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useGridStore } from "../../utils/grid-store";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export function ToggleEdit() {
    const { t } = useTranslation();
  const { editMode, toggleEditMode } = useGridStore();
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn("hidden xl:flex", {
              "text-foreground": editMode,
              "text-foreground/50": !editMode,
            })}
            onClick={toggleEditMode}
          >
            <Scaling size={20} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side={"bottom-end" as unknown as "bottom"}>
          {editMode ? t("exitEditMode") : t("enterEditMode")}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
