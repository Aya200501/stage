import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddWidgetStore } from "@/pages/dashboard/utils/add-widget-store";
import { telemetryCalculationTypes } from "@/utils";
import { useTranslation } from "react-i18next";

export function SelectCalculation() {
  const { data, setAttribute } = useAddWidgetStore();
  const { t } = useTranslation();

  const calculation = (data.attributes?.calculation || "last") as string;
  const setCalculation = (val: string) => {
    setAttribute("calculation", val);
  };

  return (
    <Select
      onValueChange={(val) => {
        setCalculation(val);
      }}
      value={calculation}
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
