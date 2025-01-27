import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ClothesFilters } from "../clothes-filter";
import { FaceFilters } from "../face-filter";
import { VehicleFilters } from "../vehicle-filter";
import { LprFilters } from "../lpr-filter";
import { useSearchStore } from "../../store";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { SearchCheckIcon, Undo2Icon } from "lucide-react";

export function Filters() {
  const {
    tmpFilters,

    applyFilters,
    cancelFilters,
    setStartDate,
    setEndDate,
    getIsFiltered,
  } = useSearchStore();
  const isFiltered = getIsFiltered();
  const { startDate, endDate } = tmpFilters;
  const { t } = useTranslation();
  return (
    <div className="w-80 h-full flex flex-col bg-background/50  ">
      <div className="py-4 text-center p-4 text-base font-semibold  border-foreground/10 border-b">
        Filter
      </div>
      <ScrollArea>
        <div className="  hide-scrollbar [&>*]:border-b">
          <div className="space-y-4 p-4 ">
            <span className="font-semibold text-sm capitalize">
              Date / {t("hour")}
            </span>
            <div className="flex items-center gap-3">
              <Label className="w-12 capitalize" htmlFor="date-start">
                {t("start")}
              </Label>
              <div className="flex-1 ">
                <Input
                  id="date-start"
                  type="datetime-local"
                  className="flex-1 w-full bg-card accent-black"
                  value={startDate?.toISOString().slice(0, 16)}
                  onChange={(e) => {
                    setStartDate(new Date(e.target.value));
                  }}
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Label className="w-12 capitalize" htmlFor="date-end">
                {t("end")}
              </Label>
              <div className="flex-1 ">
                <Input
                  id="date-end"
                  type="datetime-local"
                  style={{}}
                  className="flex-1 w-full bg-card"
                  value={endDate?.toISOString().slice(0, 16)}
                  onChange={(e) => {
                    setEndDate(new Date(e.target.value));
                  }}
                />
              </div>
            </div>
          </div>
          <ClothesFilters />
          <FaceFilters />
          <VehicleFilters />
          <LprFilters />
        </div>
      </ScrollArea>
      <div className="py-2 gap-3 flex justify-end">
        <Button
          className="gap-1 capitalize"
          variant={"outline"}
          size={"sm"}
          disabled={isFiltered}
          onClick={cancelFilters}
        >
          <span>{t("undo")}</span>
          <Undo2Icon size={20} />
        </Button>
        <Button
          className="gap-1 "
          size={"sm"}
          onClick={applyFilters}
          disabled={isFiltered}
        >
          <span className="first-letter:uppercase">{t("apply filters")}</span>
          <SearchCheckIcon size={24} />
        </Button>
      </div>
    </div>
  );
}
