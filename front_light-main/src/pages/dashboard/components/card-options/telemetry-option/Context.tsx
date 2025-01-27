import { CameraType, Telemetry } from "@/utils";
import { createContext, useContext } from "react";

export type TTelemetryOptionContext = {
  cameras: CameraType[];
  selectedTelemetry?: Telemetry | null;
  telemetriesOptions: Telemetry[];
};

export const TelemetryOptionContext =
  createContext<TTelemetryOptionContext | null>(null);

export function useTelemetryOptionContext() {
  const context = useContext(TelemetryOptionContext);
  if (!context) {
    throw new Error(
      "useTelemetryOptionContext must be used within a TelemetryOptionProvider"
    );
  }
  return context;
}

export default TelemetryOptionContext;
