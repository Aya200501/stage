import { useGlobalContext } from "@/Context";
import { Widget, flatten } from "@/utils";
import useSWR from "swr";
import { env } from "@/lib/env";
import { useMemo } from "react";
import { useGridStore } from "@/pages/dashboard/utils/grid-store";
import Loader from "../../loader";
import { Icon } from "@/components/icon";
import { useTranslation } from "react-i18next";

type Data = {
  cameraId?: string;
  icon?: string;
  telemetryName?: string;
  calculationType?: "average" | "sum";
};

export default function HistoryOption({ title, attributes }: Widget) {
  const { t } = useTranslation();
  const { backendApi } = useGlobalContext();
  const { dateRange } = useGridStore();

  const {
    cameraId,
    telemetryName,
    icon,
    calculationType = "sum",
  } = attributes as Data;

  const { data, isLoading, error } = useSWR(
    `histories?${JSON.stringify({
      cameraId,
      telemetryName,
      dateRange,
    })}`,
    async () => {
      if (!cameraId) return [];
      const results = await backendApi.getHistory({
        cameraId,
        select: ["results." + telemetryName],
        startDate: dateRange.from,
        endDate: dateRange.to,
        take: env.VITE_HISTORY_MAX,
      });
      return results;
    }
  );

  const calculated = useMemo(() => {
    if (!data?.length)
      return {
        average: 0,
        sum: 0,
      };
    const sum =
      data?.reduce((acc, item) => {
        const value = Number(flatten(item)["results." + telemetryName]);
        if (isNaN(value)) return acc;
        return acc + value;
      }, 0) ?? 0;
    const average = sum / data?.length;
    return { average, sum };
  }, [data]);
  if (isLoading)
    return (
      <main className="grid place-content-center text-xs">
        <Loader />
      </main>
    );
  if (error)
    return (
      <main className="grid place-content-center  text-foreground/50">
        {t("somethingError")}
      </main>
    );

  return (
    <div className="flex justify-between items-center   overflow-hidden  w-full h-full">
      <div className="flex gap-2 flex-col  capitalize">
        <span className="font-semibold">{title}</span>
        <span className="first-letter:uppercase truncate">
          {calculated[calculationType]}
        </span>
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
