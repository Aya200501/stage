/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGlobalContext } from "@/Context";
import { Label } from "@/components/ui/label";
import { useAddWidgetStore } from "@/pages/dashboard/utils/add-widget-store";
import { CameraType } from "@/utils";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import TelemetryOptionContext from "./Context";
import { SelectCamera } from "./select-camera";
import { SelectCalculation } from "./select-calculation";
import { FilterValue } from "./filter-value";
import { SelectTelemetry } from "./select-telemtry";

export default function TelemetryOption() {
  const { backendApi, groupId } = useGlobalContext();
  const { data } = useAddWidgetStore();
  const { t } = useTranslation();
  const cameraId = (data.attributes?.cameraId || "") as string;
  const telemetryName = (data.attributes?.telemetryName || "") as string;

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

  const telemetriesOptions = useMemo(() => {
    const selectedCameras = cameras.filter((item) =>
      cameraId?.includes(item.id)
    );
    // map and flatten telemetries
    return selectedCameras.map((camera) => camera.telemetries).flat() || [];
  }, [cameras, cameraId]);

  const selectedTelemetry = useMemo(() => {
    return telemetriesOptions?.find((t) => t.name === telemetryName);
  }, [telemetriesOptions, telemetryName]);

  if (isLoading) {
    return <div>{t("loading")}</div>;
  }
  if (error) {
    return <div>{t("somethingError")}</div>;
  }

  return (
    <TelemetryOptionContext.Provider
      value={{ cameras, selectedTelemetry, telemetriesOptions }}
    >
      <div className="grid grid-cols-[min-content,1fr] items-center gap-x-4 gap-y-2">
        <Label htmlFor="camera">{t("camera")}</Label>
        <SelectCamera />
        <Label htmlFor="name">{t("telemetry")}</Label>
        <SelectTelemetry />
        <Label htmlFor="type">{t("calculation")}</Label>
        <SelectCalculation />
        <Label htmlFor="filterValue">{t("filterValue")}</Label>
        <FilterValue />
      </div>
    </TelemetryOptionContext.Provider>
  );
}
