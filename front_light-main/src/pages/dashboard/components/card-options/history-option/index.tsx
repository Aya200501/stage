import { useGlobalContext } from "@/Context";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddWidgetStore } from "@/pages/dashboard/utils/add-widget-store";
import { CameraType, flatten } from "@/utils";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import useSWR from "swr";

const calculationTypes = ["average", "sum"];

export default function HistoryOption() {
    const { t } = useTranslation();
  const { backendApi, groupId } = useGlobalContext();
  const { data, setAttribute } = useAddWidgetStore();

  const cameraId = (data.attributes?.cameraId || "") as string;
  const telemetryName = (data.attributes?.telemetryName || "") as string;
  const calculationType = (data.attributes?.calculationType ||
    "average") as string;

  const setCameraId = (val: string) => {
    setAttribute("cameraId", val);
  };

  const setTelemetryName = (telemetryName: string) => {
    setAttribute("telemetryName", telemetryName);
  };
  const setCalculationType = (telemetryName: string) => {
    setAttribute("calculationType", telemetryName);
  };

  const {
    data: cameras = [],
    isLoading,
    error,
  } = useSWR(`dashboard/cameras/${groupId}`, async () => {
    const res = await backendApi.findMany<CameraType>("camera", {
      select: {
        id: true,
        name: true,
        telemetries: { select: { name: true, value: true } },
      },
      pagination: { page: 1, perPage: 100 },
      where: {
        // groupId,
      },
    });
    return res.results;
  });

  const telemetriesOptions = useMemo(
    () => cameras.find((device) => device.id === cameraId)?.telemetries || [],
    [cameras, cameraId]
  );

  if (isLoading) {
    return <div>{t("loading")}</div>;
  }
  if (error) {
    return <div>{t("somethingError")}</div>;
  }

  return (
    <div className="grid grid-cols-[min-content,1fr] items-center gap-x-4 gap-y-2">
      <Label htmlFor="camera">{t("camera")}</Label>
      <Select value={cameraId} onValueChange={setCameraId}>
        <SelectTrigger>
          <SelectValue placeholder={t("selectCamera")}/>
        </SelectTrigger>
        <SelectContent>
          {cameras.map((item) => (
            <SelectItem value={item.id} key={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Label htmlFor="name">{t("telemetry")}</Label>
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
      <Label htmlFor="calculationType" className="first-letter:uppercase">{t("calculType")}</Label>
      <Select
        value={calculationType}
        onValueChange={(val) => {
          setCalculationType(val);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder={t("select")} />
        </SelectTrigger>
        <SelectContent>
          {calculationTypes.map((item) => (
            <SelectItem value={item} key={item}>
              {t(item)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
