import { useAddWidgetStore } from "@/pages/dashboard/utils/add-widget-store";
import { usePieOptionsContext } from "../Context";
import { toast } from "sonner";
import { SelectCamera } from "./select-camera";
import { SelectTelemetry } from "./select-telemtry";
import { TelemetryLabel } from "./telemetry-label";
import { SelectCalculation } from "./select-calculation";
import { FilterValue } from "./filter-value";
import { SelectColor } from "./select-color";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export function AddTelemetryForm() {
  const { telemetryData } = usePieOptionsContext();
  const { addTelemetry } = useAddWidgetStore();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.stopPropagation();
    e.preventDefault();

    if (!telemetryData.cameraId || !telemetryData.name) {
      toast.error("cameraId and name are required");
      return;
    }
    addTelemetry(telemetryData, true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-x-2 gap-y-3"
    >
      <SelectCamera />
      <SelectTelemetry />
      <TelemetryLabel />
      <SelectCalculation />
      <FilterValue />
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
