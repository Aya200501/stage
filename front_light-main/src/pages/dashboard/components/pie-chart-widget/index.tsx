/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGlobalContext } from "@/Context";
import { ChartTelemetry, Widget } from "@/utils";
import useSWR from "swr";
import Loader from "../loader";
import ReactApexChart from "react-apexcharts";
import { useTranslation } from "react-i18next";
import { useGridStore } from "../../utils/grid-store";

type Props = Widget;

export default function DonutChartWidget(props: Props) {
  const { t } = useTranslation();
  const { backendApi, theme } = useGlobalContext();
  const { dateRange } = useGridStore();

  const telemetries = (props.attributes?.telemetries || []) as ChartTelemetry[];
  const id = "chart-" + props.id;

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
    return Number(results.data["results." + name]) || 0;
  };

  const { data, isLoading, error } = useSWR(
    `telemetries?${JSON.stringify({ telemetries, dateRange })}`,
    async () => {
      return await Promise.all(telemetries.map(getTelemetry));
    }
  );

  if (isLoading)
    return (
      <div className="w-full h-full  grid place-content-center">
        <Loader />
      </div>
    );
  if (error)
    return (
      <div className="w-full h-full  grid place-content-center">
        <h3>{t("somethingError")}.</h3>
      </div>
    );
  return (
    <div className=" w-full h-full  ">
      <ReactApexChart
        series={data || []}
        options={{
          theme: { mode: theme },
          chart: {
            id,
            type: "pie",
            background: "transparent",
            animations: { enabled: false },
          },
          stroke: { width: 0 },
          legend: { position: "bottom" },
          colors: telemetries.map((t) => t.color || "#000"),
          dataLabels: {
            enabled: true,
            formatter: function (val) {
              return Number(val).toFixed(2) + "%";
            },
          },
          labels: telemetries.map(
            (t) => t.label || t?.name?.split(".").at(-1) || ""
          ),
        }}
        type={"pie"}
        width={"105%"}
        height={"105%"}
      />
    </div>
  );
}
