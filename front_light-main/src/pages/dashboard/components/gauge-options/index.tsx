import { useGlobalContext } from "@/Context";
import { useAddWidgetStore } from "../../utils/add-widget-store";
import { useMemo } from "react";
import { CameraType, GaugeWidgetData, flatten } from "@/utils";
import useSWR from "swr";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import AddArc from "./add-ard";
import { useTranslation } from "react-i18next";

export default function GaugeOptions() {
  const { t } = useTranslation();
  const { data, setAttribute } = useAddWidgetStore();
  const { backendApi, groupId } = useGlobalContext();

  const { cameraId, telemetryName, stops } = data.attributes as GaugeWidgetData;

  const setCameraId = (cameraId: string) => {
    setAttribute("cameraId", cameraId);
  };

  const setTelemetryName = (telemetryName: string) => {
    setAttribute("telemetryName", telemetryName);
  };

  const setUnit = (unit: string) => {
    setAttribute("unit", unit);
  };

  const setShowGaugeNeedle = (showGaugeNeedle: boolean) => {
    setAttribute("showGaugeNeedle", showGaugeNeedle);
  };

  const { data: cameras = [] } = useSWR(
    `dashboard/cameras/${groupId}`,
    async () => {
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
    }
  );

  const selectedCamera = useMemo(
    () => cameras.find((item) => item.id === cameraId),
    [cameras, cameraId]
  );

  return (
    <div className="grid grid-cols-[min-content,1fr] gap-x-2 gap-y-3  items-center [&>*]:whitespace-nowrap ">
      <Label htmlFor="serial">serial *</Label>
      <Select value={cameraId} onValueChange={setCameraId}>
        <SelectTrigger>
          <SelectValue placeholder={t("selectCamera")} />
        </SelectTrigger>
        <SelectContent>
          {cameras.map((item) => (
            <SelectItem value={item.id}>{item.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Label htmlFor="name">{t("telemetry")} *</Label>
      <Select
        disabled={!cameraId}
        onValueChange={setTelemetryName}
        value={telemetryName}
      >
        <SelectTrigger>
          <SelectValue placeholder={t("selectTelemetry")} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{t("telemetry")}</SelectLabel>
            {selectedCamera?.telemetries?.map((t, index) => {
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
      <Label htmlFor="unit">unit</Label>
      <Input
        placeholder={t("unit")}
        name="unit"
        onChange={(e) => {
          setUnit(e.target.value);
        }}
      />
      <Label htmlFor="show-needle">show needle</Label>
      <Switch defaultChecked onCheckedChange={setShowGaugeNeedle} />
      <Label htmlFor="unit">stops</Label>
      <div className="flex flex-col border border-gray-500/20 gap-2 p-2">
        {stops?.map((arc, index) => (
          <div
            key={index}
            className="flex gap-4 justify-between p-2 border-b border-gray-500/10"
          >
            <div className="flex text-sm gap-1 items-center ">
              <span className="text-gray-500 text-xs">stop:</span>
              <span>{arc.stop}</span>
            </div>
            <div className="flex text-sm gap-1 items-center ">
              <span className="text-gray-500 text-xs">color:</span>
              <span
                className="h-5 aspect-video rounded border-gray-500/20"
                style={{
                  backgroundColor: arc.color,
                }}
              />
            </div>
          </div>
        ))}
        <div className="flex items-center gap-2 justify-between ">
          <span className="text-xs text-gray-500">{"minimum 1 stops"}</span>
          <AddArc />
        </div>
      </div>
    </div>
  );
}
