import { CameraType, ChartTelemetry } from "@/utils";
import { createContext, useContext } from "react";

export type TLineChartContext = {
  telemetryData: ChartTelemetry;
  setTelemetryData: React.Dispatch<React.SetStateAction<ChartTelemetry>>;
  cameras: CameraType[];
};

export const LineChartContext = createContext<TLineChartContext | null>(null);

export function useLineChartContext() {
  const context = useContext(LineChartContext);
  if (!context) {
    throw new Error(
      "useLineChartContext must be used within a LineChartProvider"
    );
  }
  return context;
}

export default LineChartContext;
