import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { useSearchStore } from "../../store";
import useSWR from "swr";
import { useGlobalContext } from "@/Context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import NoData from "@/assets/no-data.svg?react";
import { useTranslation } from "react-i18next";

export function Results() {
  const { backendApi, theme } = useGlobalContext();
  const { ids, cameras, page, perPage, filters, setPage, setPerPage } =
    useSearchStore();

  const key = `results-${JSON.stringify({
    ids,
    page,
    perPage,
    filters,
  })}`;

  const { t } = useTranslation();
  const {
    lprFilter,
    lpr,
    clothesFilter,
    vehicleFilter,
    vehicle,
    faceFilter,
    startDate,
    endDate,
  } = filters;

  const {
    data = [],
    isLoading,
    error,
  } = useSWR(key, async () => {
    const where: any = {
      $or: [],
    };
    if (lprFilter) {
      where.$or.push({ "results.LPR": { $exists: true } });
      Object.entries(lpr)
        .filter(([_key, value]) => value)
        .forEach(([key, value]) => {
          if (key === "plate") {
            where["results.LPR." + key] = {
              $regex: value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
              $options: "i",
            };
          } else where["results.LPR." + key] = value;
        });
    }
    if (clothesFilter) where.$or.push({ "results.clothes": { $exists: true } });
    if (vehicleFilter) {
      where.$or.push({ "results.vehicule": { $exists: true } });
      Object.entries(vehicle)
        .filter(([_key, value]) => value)
        .forEach(([key, value]) => {
          if (key === "make") {
            where["results.vehicule." + key] = {
              $regex: value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
              $options: "i",
            };
          } else where["results.vehicule." + key] = value;
        });
    }

    if (faceFilter) where.$or.push({ "results.face": { $exists: true } });
    if (ids.length === 0) return [];
    if (!lprFilter && !clothesFilter && !vehicleFilter && !faceFilter)
      return [];
    const result = await backendApi.getHistory({
      cameraId: ids.join(","),
      select: ["results", "cameraId", "screenshot", "createdAt"],
      startDate: startDate ? startDate : undefined,
      endDate: endDate ? endDate : undefined,
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: JSON.stringify({ createdAt: "desc" }),
      where,
    });
    return result;
  });

  if (error)
    return (
      <Card className="grid place-content-center h-full overflow-hidden p-20 text-center text-balance">
        <span className="text-3xl text-foreground/50">
          Erreur lors de la récupération des résultats
        </span>
      </Card>
    );

  return (
    <Card className="flex flex-col h-full overflow-hidden min-h-[30rem] ">
      <div className="flex p-4 border-b items-center justify-end ">
        <Select onValueChange={(v) => setPerPage(parseInt(v))}>
          <SelectTrigger className="w-fit mr-auto">
            {perPage} / {t("perpage")}
          </SelectTrigger>
          <SelectContent className={theme}>
            {[10, 20, 50].map((item) => (
              <SelectItem key={item} value={item + ""}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="ghost"
          size="sm"
          disabled={page === 1}
          onClick={() => {
            setPage(page - 1);
          }}
        >
          <ChevronLeft size={24} />
          <span className="first-letter:uppercase">{t("previous")}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setPage(page + 1);
          }}
          disabled={data.length < perPage}
        >
          <span className="first-letter:uppercase">{ t("next") }</span>
          <ChevronRight size={24} />
        </Button>
      </div>
      <ScrollArea className="h-1 flex-1 relative">
        <div className="  h-full grid p-4 grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] auto-rows-[14rem] gap-4 ">
          {data.map((item, i) => {
            const { cameraId } = item;
            const camera = cameras.find((c) => c.id === cameraId);
            return (
              <div
                className="border rounded-lg bg-foreground/5 gap-2 flex flex-col p-3"
                key={i}
              >
                <div className="flex items-center gap-1">
                  <MapPin size={16} className="text-primary" />
                  <span className="font-semibold truncate">
                    {camera?.group.name}
                  </span>
                </div>
                <div className=" h-1 flex-1">
                  <img
                    src={item.screenshot}
                    alt="example"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex items-center  gap-2 justify-between">
                  <span className="font-semibold text-sm">
                    {format(new Date(item.createdAt), "dd/MM/yyyy ")}
                  </span>
                  <span className="font-semibold text-sm">
                    {format(new Date(item.createdAt), "HH:mm")}
                  </span>
                </div>
              </div>
            );
          })}
          {isLoading &&
            Array.from({ length: perPage }).map((_, i) => {
              return (
                <div
                  className="border rounded-lg bg-foreground/20 animate-pulse gap-2 flex flex-col p-3"
                  key={i}
                ></div>
              );
            })}
          {!isLoading && data.length === 0 && (
            <div className="absolute  pointer-events-none w-full h-full p-6 inset-0 flex flex-col  justify-center items-center gap-6">
              <NoData className="w-1/2 h-1/2" />
              <p className="text-xl text-foreground/50 first-letter:uppercase font-medium">
                {t("no results found for the selected filters")}
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
}
