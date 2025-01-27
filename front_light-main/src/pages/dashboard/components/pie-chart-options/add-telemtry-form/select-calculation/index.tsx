import { useTranslation } from "react-i18next";
import { usePieOptionsContext } from "../../Context";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { telemetryCalculationTypes } from "@/utils";

export function SelectCalculation() {
  const { telemetryData, setTelemetryData } = usePieOptionsContext();
  const { t } = useTranslation();

  return (
    <Select
      onValueChange={(val) => {
        setTelemetryData((prev) => ({
          ...prev,
          type: val,
        }));
      }}
      value={telemetryData.type}
    >
      <SelectTrigger>
        <SelectValue placeholder={t("calculation")} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t("calculation")}</SelectLabel>
          {telemetryCalculationTypes?.map((it, index) => {
            return (
              <SelectItem key={index} value={it}>
                {it}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
