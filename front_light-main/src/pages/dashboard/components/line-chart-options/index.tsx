import { useGlobalContext } from "@/Context";
import { CameraType, ChartTelemetry } from "@/utils";
import { useState } from "react";
import useSWR from "swr";
import LineChartContext from "./Context";
import { Label } from "@/components/ui/label";

import { GroupBy } from "./group-by";
import { AddTelemetryForm } from "./add-telemtry-form";
import { TelemetriesList } from "./telemetries-list";

const defaultTelemetry: ChartTelemetry = {
  cameraId: "",
  name: "",
  label: "",
  color: "#d32727",
  unit: "",
  coefficient: undefined,
};

export default function LineChartOptions() {
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
        // where: { groupId },
      });
      return res.results;
    }
  );

  return (
    <LineChartContext.Provider
      value={{ telemetryData, setTelemetryData, cameras }}
    >
      <div className="flex flex-col gap-4 relative isolate">
        <Label>Default Group By</Label>
        <GroupBy />
        <Label>Add Telemetries</Label>
        <AddTelemetryForm />
        <Label>
          Telemetries{" "}
          <span className="font-light ml-">At least one is required</span>
        </Label>
        <TelemetriesList />
      </div>
    </LineChartContext.Provider>
  );
}
