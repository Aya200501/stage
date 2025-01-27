import { useTranslation } from "react-i18next";
import { usePieOptionsContext } from "../../Context";
import { Input } from "@/components/ui/input";

export function TelemetryLabel() {
  const { telemetryData, setTelemetryData } = usePieOptionsContext();
  const { t } = useTranslation();
  return (
    <Input
      placeholder={t("label")}
      value={telemetryData.label}
      onChange={(e) => {
        setTelemetryData((prev) => ({
          ...prev,
          label: e.target.value,
        }));
      }}
    ></Input>
  );
}
