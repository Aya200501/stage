import { useGlobalContext } from "@/Context";
import { CameraType, ChartTelemetry } from "@/utils";
import { useState } from "react";
import useSWR from "swr";
import PieOptionsContext from "./Context";
import { Label } from "@/components/ui/label";
import { AddTelemetryForm } from "./add-telemtry-form";
import { TelemetriesList } from "./telemtries-list";

const defaultTelemetry: ChartTelemetry = {
  cameraId: "",
  name: "",
  label: "",
  color: "#d32727",
  type: "last",
};

export default function PieChartOptions() {
  const { backendApi, groupId } = useGlobalContext();
  const [telemetryData, setTelemetryData] = useState(defaultTelemetry);

  const { data: cameras = [] } = useSWR(
    `dashboard/cameras/${groupId}`,
    async () => {
      const res = await backendApi.findMany<CameraType>("camera", {
        select: {
          id: true,
          name: true,
          telemetries: { select: { name: true, value: true } },
        },
        pagination: { page: 1, perPage: 100 },
        where: {
          // groupId,
        },
      });
      return res.results;
    }
  );

  return (
    <PieOptionsContext.Provider
      value={{ telemetryData, setTelemetryData, cameras }}
    >
      <div className="flex flex-col  relative gap-2">
        <Label>Add Telemetries</Label>
        <AddTelemetryForm />
        <Label className="mt-4">
          Telemetries{" "}
          <span className="font-light ml-">(At least Two are required)</span>
        </Label>
        <TelemetriesList />
      </div>
    </PieOptionsContext.Provider>
  );
}
