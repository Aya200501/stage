/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGlobalContext } from "@/Context";
import { TableWidgetData, Widget } from "@/utils";
import Loader from "../loader";
import { useGridStore } from "../../utils/grid-store";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { BallLoader } from "@/components/ball-loader";
import { TableRow } from "./table-row";
import { TableHeader } from "./table-header";
import { TriangleAlertIcon } from "lucide-react";
import useSWR from "swr";

class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CustomError";
  }
}

type Props = Widget;

const PER_PAGE = 20;

export default function TableWidget({ attributes }: Props) {
  const { t } = useTranslation();
  const { backendApi } = useGlobalContext();
  const { dateRange } = useGridStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const [error, setError] = useState<any>(null);

  const page = useRef(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const { ref: refresheRef, inView: refresheInView } = useInView({
    threshold: 0,
  });

  const { mappings } = attributes as TableWidgetData;
  let { cameraId } = attributes as TableWidgetData;
  cameraId = cameraId?.replace(/^,/, "");

  const fetcher = async () => {
    setIsLoading(true);
    if (!cameraId || (!dateRange.from && !dateRange.to)) return [];
    const ids = cameraId.split(",");
    const { totalResult } = await backendApi.findMany("camera", {
      where: {
        id: { in: ids },
      },
    });
    if (totalResult !== ids.length) {
      setIsLastPage(true);
      throw new CustomError("selected cameras not found, please update widget");
    }

    try {
      const res = await backendApi.getHistory({
        cameraId,
        select: [
          ...mappings.map(
            (m) =>
              (m.telemetryName === "screenshot" ? "" : "results.") +
              m.telemetryName
          ),
        ],
        startDate: dateRange.from,
        endDate: dateRange.to,
        take: PER_PAGE,
        skip: PER_PAGE * (page.current - 1),
        orderBy: JSON.stringify({ createdAt: "desc" }),
        where: {
          _id: { $ne: null },
        },
      });
      if (res.length < PER_PAGE) {
        setIsLastPage(true);
      }
      page.current++;
      return res.filter((item) => typeof item._id === "string");
    } catch (error) {
      setError(error);
      return [];
    }
  };

  const onDeleted = (id: string) => {
    setItems((prev) => prev.filter((item) => item._id !== id));
  };

  const mutationKey = `${JSON.stringify(
    dateRange
  )}-${cameraId}${refresheInView}`;

  useSWR(
    mutationKey,
    async () => {
      if (!cameraId || !dateRange!.from || refresheInView === false) return [];

      const res = await backendApi.getHistory({
        cameraId,
        select: [
          ...mappings.map(
            (m) =>
              (m.telemetryName === "screenshot" ? "" : "results.") +
              m.telemetryName
          ),
          "_id",
          "id",
        ],
        take: 1000,
        orderBy: JSON.stringify({ createdAt: "desc" }),
        where: {
          _id: { $ne: null },
          createdAt: {
            $gt: items.length > 0 ? items[0].createdAt : dateRange.from,
          },
        },
      });
      return res.filter((item) => typeof item._id === "string");
    },
    {
      revalidateOnFocus: false,
      refreshInterval: 10_000,
      onSuccess: (data: any) => {
        setItems((prev) => [...data, ...prev]);
      },
    }
  );

  const loadMore = async () => {
    const res = await fetcher();
    setItems((prev) => [...prev, ...res]);
    setIsLoading(false);
  };

  const handleDateRangeChange = async () => {
    page.current = 1;
    const res = await fetcher();
    setTimeout(() => {
      setItems(res);
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    if (isLastPage || isLoading || !inView) return;
    loadMore();
  }, [inView, isLastPage, isLoading]);

  useEffect(() => {
    setItems([]);
    setIsLastPage(false);
    handleDateRangeChange();
  }, [dateRange]);

  if (error)
    return (
      <main className="grid place-content-center">
        <h3 className=" text-xl font-semibold text-[#7f7f7f]  flex items-center gap-2">
          <TriangleAlertIcon size={20} />
          <span className="first-letter:uppercase">
            {error instanceof CustomError
              ? t(error.message)
              : t("somethingError")}
            .
          </span>
        </h3>
      </main>
    );

  return (
    <main ref={containerRef} className="text-sm  flex flex-col">
      <TableHeader mappings={mappings} />
      <div className="relative flex flex-col overflow-auto flex-1 h-2">
        <div ref={refresheRef} className="w-full min-h-2  flex-1 relative">
          {/* {isLoading && items.length >= PER_PAGE && <BallLoader />} */}
        </div>
        {items.map((item, index) => {
          return (
            <TableRow
              onDeleted={onDeleted}
              key={index}
              item={item}
              mappings={mappings}
            />
          );
        })}
        <div ref={ref} className="w-full min-h-4  flex-1 relative">
          {isLoading && items.length >= PER_PAGE && <BallLoader />}
        </div>
      </div>
      {isLoading && items.length === 0 && (
        <main className=" grid place-content-center absolute inset-0 ">
          <Loader />
        </main>
      )}
    </main>
  );
}
