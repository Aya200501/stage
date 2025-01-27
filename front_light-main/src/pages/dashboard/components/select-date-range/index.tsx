import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRange } from "@/utils";
import { useEffect } from "react";
import { CalendarClock } from "lucide-react";
import { useGridStore } from "../../utils/grid-store";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;

export default function SelectDateRange({ className }: { className?: string }) {
  const { t } = useTranslation();
  const { setFrom } = useGridStore();
  const DateRangeMap: Record<string, DateRange> = {
    lastHour: {
      from: new Date(Date.now() - HOUR),
    },
    today: {
      from: new Date(new Date().setHours(0, 0, 0, 0)),
    },
    lastDay: {
      from: new Date(Date.now() - DAY),
    },
    lastWeek: {
      from: new Date(Date.now() - WEEK),
    },
    lastMonth: {
      from: new Date(Date.now() - MONTH),
    },
  };

  useEffect(() => {
    setFrom(DateRangeMap["lastHour"].from as Date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn("relative ", className)}>
      <CalendarClock
        className="absolute bottom-1/2 left-2 translate-y-1/2"
        size={20}
        strokeWidth={1.5}
      />
      <Select
        onValueChange={(value) => {
          setFrom(DateRangeMap[value].from as Date);
        }}
        defaultValue="lastHour"
      >
        <SelectTrigger className={cn("w-48 pl-11 !bg-transparent ")}>
          <SelectValue placeholder="Date" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(DateRangeMap).map((key) => (
            <SelectItem
              key={key}
              value={key}
              className="first-letter:uppercase"
            >
              {t(key)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
