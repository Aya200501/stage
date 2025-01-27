import { useTranslation } from "react-i18next";
import { usePieOptionsContext } from "../../Context";
import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { flatten } from "@/utils";

export function SelectTelemetry() {
  const { cameras, telemetryData, setTelemetryData } = usePieOptionsContext();
  const { t } = useTranslation();

  const telemetries = useMemo(() => {
    const selectedCameras = cameras.filter((item) =>
      telemetryData.cameraId?.includes(item.id)
    );
    // map and flatten telemetries
    return selectedCameras.map((camera) => camera.telemetries).flat();
  }, [cameras, telemetryData.cameraId]);

  return (
    <Select
      disabled={!telemetryData.cameraId}
      onValueChange={(val) => {
        setTelemetryData((prev) => ({
          ...prev,
          name: val,
        }));
      }}
      value={telemetryData.name}
    >
      <SelectTrigger>
        <SelectValue placeholder={t("selectTelemetry")} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t("telemetry")}</SelectLabel>
          {telemetries?.map((t, index) => {
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
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
