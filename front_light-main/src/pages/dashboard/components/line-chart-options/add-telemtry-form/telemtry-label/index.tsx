import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { useLineChartContext } from "../../Context";

export function TelemetryLabel() {
  const { t } = useTranslation();
  const { telemetryData, setTelemetryData } = useLineChartContext();
  return (
    <Input
      className="rounded"
      placeholder={t("label")}
      name="label"
      value={telemetryData.label}
      onChange={(e) => {
        setTelemetryData((prev) => ({
          ...prev,
          label: e.target.value,
        }));
      }}
    />
  );
}
