import ColorPicker from "@/components/color-picker";
import { usePieOptionsContext } from "../../Context";

export function SelectColor() {
  const { telemetryData, setTelemetryData } = usePieOptionsContext();
  return (
    <ColorPicker
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
