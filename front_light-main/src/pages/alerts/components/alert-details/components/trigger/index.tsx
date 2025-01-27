import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useAlertDetailsDrawer } from "../../store";
import { AlertType } from "@/utils";

interface AlertDetailsTriggerProps {
  alert: AlertType;
}

export const AlertDetailsTrigger = ({ alert }: AlertDetailsTriggerProps) => {
  const onOpen = useAlertDetailsDrawer((state) => state.open);

  return (
    <Button
      className="gap-3 bg-[#F5F7FA]/10 text-sm text-[#F5F7FA] hover:bg-[#F5F7FA]/5 hover:text-[#F5F7FA]/70"
      onClick={() => onOpen(alert)}
    >
      <Eye className="size-5" />
      Voir les détails de l&apos;alerte
    </Button>
  );
};
