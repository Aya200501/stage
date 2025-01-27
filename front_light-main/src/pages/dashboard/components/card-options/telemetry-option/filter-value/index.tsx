/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { useAddWidgetStore } from "@/pages/dashboard/utils/add-widget-store";
import { useTranslation } from "react-i18next";
import { useTelemetryOptionContext } from "../Context";

export function FilterValue() {
  const { data, setAttribute } = useAddWidgetStore();
  const { t } = useTranslation();
  const { selectedTelemetry } = useTelemetryOptionContext();
  const filterValue = data.attributes?.filterValue as string | undefined;
  const telemetryName = data.attributes?.telemetryName as string;

  const setFilterValue = (value: any) => {
    setAttribute("filterValue", value);
  };

  return (
    <Input
      placeholder={t("filterValue")}
      value={filterValue}
      onChange={(e) => {
        setFilterValue(
          selectedTelemetry && typeof selectedTelemetry.value === "number"
            ? Number(e.target.value)
            : e.target.value
        );
      }}
      disabled={!telemetryName}
    />
  );
}
