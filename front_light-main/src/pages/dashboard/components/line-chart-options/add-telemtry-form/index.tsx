import { useAddWidgetStore } from "@/pages/dashboard/utils/add-widget-store";
import { useLineChartContext } from "../Context";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { SelectCamera } from "./select-camera";
import { SelectTelemetry } from "./select-telemtry";
import { TelemetryLabel } from "./telemtry-label";
import { TelemetryCoefficient } from "./telemetry-coefficient";
import { SelectColor } from "./select-color";

export function AddTelemetryForm() {
  const { telemetryData } = useLineChartContext();
  const { addTelemetry } = useAddWidgetStore();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.stopPropagation();
    e.preventDefault();

    if (!telemetryData.cameraId || !telemetryData.name) {
      toast.error("cameraId and name are required");
      return;
    }
    addTelemetry(telemetryData);
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-x-2 gap-y-3"
    >
      <SelectCamera />
      <SelectTelemetry />
      <TelemetryLabel />
      <TelemetryCoefficient />
      <SelectColor />
      <Button
        type="submit"
        variant="outline"
        disabled={!telemetryData.cameraId || !telemetryData.name}
      >
        <PlusIcon size={18} />
      </Button>
    </form>
  );
}
