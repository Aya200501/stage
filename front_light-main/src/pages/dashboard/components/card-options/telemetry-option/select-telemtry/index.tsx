import { useAddWidgetStore } from "@/pages/dashboard/utils/add-widget-store";
import { useTelemetryOptionContext } from "../Context";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { flatten } from "@/utils";

export function SelectTelemetry() {
  const { data, setAttribute } = useAddWidgetStore();
  const { telemetriesOptions } = useTelemetryOptionContext();
  const { t } = useTranslation();
  const cameraId = (data.attributes?.cameraId || "") as string;
  const telemetryName = (data.attributes?.telemetryName || "") as string;

  const setTelemetryName = (val: string) => {
    setAttribute("telemetryName", val);
  };

  return (
    <Select
      disabled={!cameraId}
      value={telemetryName}
      onValueChange={(val) => {
        setTelemetryName(val);
      }}
    >
      <SelectTrigger className="">
        <SelectValue placeholder={t("selectTelemetry")} />
      </SelectTrigger>
      <SelectContent>
        {telemetriesOptions?.map((t, index) => {
          if (typeof t.value === "object" && !Array.isArray(t.value)) {
            return Object.keys(
              flatten({
                [t.name]: t.value,
              })
            )?.map((v, index) => (
              <SelectItem key={v + index} value={v}>
                {v}
              </SelectItem>
            ));
          } else {
            return (
              <SelectItem key={t.name + index} value={t.name}>
                {t.name}
              </SelectItem>
            );
          }
        })}
      </SelectContent>
    </Select>
  );
}
