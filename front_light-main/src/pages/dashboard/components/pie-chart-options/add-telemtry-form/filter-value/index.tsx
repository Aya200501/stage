import { useTranslation } from "react-i18next";
import { usePieOptionsContext } from "../../Context";
import { Input } from "@/components/ui/input";

export function FilterValue() {
  const { telemetryData, setTelemetryData } = usePieOptionsContext();
  const { t } = useTranslation();
  return (
    <Input
      placeholder={t("filterValue")}
      value={telemetryData.filterValue}
      onChange={(e) => {
        setTelemetryData((prev) => ({
          ...prev,
          filterValue: e.target.value,
        }));
      }}
    ></Input>
  );
}
