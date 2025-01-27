import { CameraType, ChartTelemetry } from "@/utils";
import { createContext, useContext } from "react";

export type TPieOptionsContext = {
  telemetryData: ChartTelemetry;
  setTelemetryData: React.Dispatch<React.SetStateAction<ChartTelemetry>>;
  cameras: CameraType[];
};

export const PieOptionsContext = createContext<TPieOptionsContext | null>(null);

export function usePieOptionsContext() {
  const context = useContext(PieOptionsContext);
  if (!context) {
    throw new Error(
      "usePieOptionsContext must be used within a PieOptionsProvider"
    );
  }
  return context;
}

export default PieOptionsContext;
