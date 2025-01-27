/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGlobalContext } from "@/Context";
import { Icon } from "@/components/icon";
import { useGridStore } from "@/pages/dashboard/utils/grid-store";
import { ChartTelemetry, Widget } from "@/utils";
import { AxiosError } from "axios";
import { Loader } from "lucide-react";
import { useTranslation } from "react-i18next";
import useSWR from "swr";

type Data = {
  cameraId: string;
  icon?: string;
  telemetryName: string;
  calculation?: string;
  filterValue?: string;
};

export default function CardWidget({ title, attributes }: Widget) {
  const { t } = useTranslation();
  const { backendApi } = useGlobalContext();
  const {
    cameraId,
    telemetryName,
    icon,
    calculation: type,
    filterValue,
  } = attributes as Data;
  const { dateRange } = useGridStore();

  const getTelemetry = async (telemetry: ChartTelemetry) => {
    const { cameraId, name, type, filterValue } = telemetry;
    const results: any = await backendApi.getTelemetry({
      name: "results." + name,
      startDate: dateRange.from,
      endDate: dateRange.to,
      cameraId,
      type,
      filterValue: filterValue || undefined,
    });
    console.log({ results });
    if (type === "last") return results.data["results." + name];
    return Number(results.data["results." + name]);
  };

  const { data, isLoading, error } = useSWR(
    `telemetries?${JSON.stringify({ attributes, dateRange })}`,
    async () => {
      return await getTelemetry({
        cameraId,
        name: telemetryName,
        type,
        filterValue,
      });
    }
  );

  if (isLoading)
    return (
      <main className="grid place-content-center text-xs">
        <Loader />
      </main>
    );
  if (error && error instanceof AxiosError && error.response?.status === 404) {
    // do not show error message
  } else if (error)
    return (
      <main className="grid place-content-center  text-foreground/50">
        {t("somethingError")}
      </main>
    );

  return (
    <div className="flex justify-between items-center   overflow-hidden  w-full h-full">
      <div className="flex gap-2 flex-col  capitalize">
        <span className="font-semibold">{title}</span>
        <span className="first-letter:uppercase truncate">{data || "---"}</span>
      </div>
      {icon ? (
        icon.includes("http") ? (
          <img src={icon} alt={title} className="w-12 h-12 object-cover mr-3" />
        ) : (
          <Icon name={icon} size={52} strokeWidth={1.5} />
        )
      ) : null}
    </div>
  );
}
