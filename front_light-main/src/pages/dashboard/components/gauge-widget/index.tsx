import { useGlobalContext } from "@/Context";
import {
  CameraType,
  GaugeWidgetData,
  Telemetry,
  Widget,
  flatten,
} from "@/utils";
import useSWR from "swr";
import GaugeChart from "react-gauge-chart";
import Loader from "../loader";
import { useTranslation } from "react-i18next";

const defaultArs = [
  {
    stop: 1,
    color: "#0c2364",
  },
];

export default function GaugeWidget({ attributes, id }: Widget) {
  const { t } = useTranslation();
  const { theme, backendApi, groupId } = useGlobalContext();

  const {
    cameraId,
    telemetryName,
    unit,
    showNeedle = true,
    stops = defaultArs,
  } = attributes as GaugeWidgetData;
  const name = telemetryName?.split(".")[0];

  const {
    data: telemetry,
    isLoading,
    error,
  } = useSWR(`group/${groupId}/${cameraId}/${telemetryName}`, async () => {
    if (!cameraId || !telemetryName) return;
    const cameras = await backendApi.findMany<CameraType>("camera", {
      where: { id: cameraId },
    });
    if (!cameras.results.length) return;
    const { results } = await backendApi.findMany<Telemetry>("telemetry", {
      pagination: { page: 1, perPage: 1 },
      where: {
        cameraId,
        name,
      },
      orderBy: { createdAt: "desc" },
    });
    return results[0];
  });

  const value =
    parseFloat(
      flatten({
        [name!]: telemetry?.value,
      })?.[telemetryName] as string
    ) || 0;

  const sortedArcs = stops?.sort((a, b) => a.stop - b.stop);
  const max = stops.at(-1)?.stop || 100;
  const arcsLength = sortedArcs.reduce((acc, arc, index, arr) => {
    if (index === 0) return [arc.stop];
    const lastArc = arr[index - 1];
    const arcLength = arc.stop - lastArc.stop;
    acc.push(arcLength);
    return acc;
  }, [] as number[]);

  const colors = sortedArcs.map((arc) => arc.color);

  if (isLoading)
    return (
      <main className="  grid place-content-center">
        <Loader />
      </main>
    );
  if (error)
    return (
      <main className=" grid place-content-center text-3xl text-foreground/50">
        <h3>{t("somethingError")}.</h3>
      </main>
    );
  if (!telemetry)
    return (
      <main className=" grid place-content-center text-3xl text-foreground/50">
        No data
      </main>
    );

  const needleColor = showNeedle ? "#7f7f7f" : "transparent";
  return (
    <div className="h-full w-full flex items-center  justify-center">
      <div className="h-full max-w-full flex items-center justify-center ">
        <GaugeChart
          id={id}
          colors={colors}
          percent={value / max}
          animate={false}
          needleBaseColor={needleColor}
          needleColor={needleColor}
          arcsLength={arcsLength}
          formatTextValue={() => `${value?.toFixed(2)} ${unit || ""}`}
          textColor={theme === "light" ? "#000" : "#fff"}
        />
      </div>
    </div>
  );
}
