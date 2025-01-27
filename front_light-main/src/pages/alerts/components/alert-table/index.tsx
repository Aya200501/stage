import { forwardRef } from "react";
import { DataTable } from "@/components/data-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BallLoader } from "@/components/ball-loader";
import { HistoricalAlertColumns } from "./columns";

interface AlertTableProps {
  alerts: any[];
  perPage: number;
  isLoading: boolean;
}

export const AlertTable = forwardRef<HTMLDivElement, AlertTableProps>(
  ({ alerts, perPage, isLoading }, ref) => {
    return (
      <ScrollArea
        orientation="both"
        scrollareathumbclassName="bg-[#777986]"
        scrollbarclassName="mt-16 bg-[#2C2C2C] rounded-full"
        className="h-full min-h-[35rem] rounded-lg bg-card p-3.5 pt-1.5 shadow overflow-hidden"
      >
        <DataTable
          columns={HistoricalAlertColumns}
          data={alerts}
          tableCellClassName="px-3.5 py-3"
          tableHeadClassName="dark:bg-[#1D1F24]"
        />
        {!isLoading && alerts.length === 0 ? null : (
          <div ref={ref} className="w-full min-h-4 h-4 relative">
            {isLoading && alerts.length >= perPage && <BallLoader />}
          </div>
        )}
      </ScrollArea>
    );
  }
);
