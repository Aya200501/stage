import ColorPicker from "@/components/color-picker";
import { useLineChartContext } from "../../Context";

export function SelectColor() {
  const { telemetryData, setTelemetryData } = useLineChartContext();
  return (
    <ColorPicker
      className="rounded-md w-full !e !ring-0 h-9 outline-none border-none"
      color={telemetryData.color}
      onChange={(color) => {
        setTelemetryData((prev) => ({
          ...prev,
          color,
        }));
      }}
    />
  );
}
