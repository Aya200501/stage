import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { useLineChartContext } from "../../Context";

export function TelemetryCoefficient() {
  const { t } = useTranslation();
  const { telemetryData, setTelemetryData } = useLineChartContext();
  return (
    <Input
      className="rounded"
      placeholder={t("coefficient")}
      name="coefficient"
      // pattern example 23.5 or 23
      value={telemetryData.coefficient}
      onChange={(e) => {
        setTelemetryData((prev) => ({
          ...prev,
          coefficient: Number(e.target.value),
        }));
      }}
    />
  );
}
