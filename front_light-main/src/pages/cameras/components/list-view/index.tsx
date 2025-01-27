import { DataTable } from "@/components/data-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { columns } from "./camera-columns";
import { CameraType } from "@/utils/api-types";
import React from "react";
import Loader from "@/pages/dashboard/components/loader";

interface CamerasInListViewProps {
  data: CameraType[];
  isLoading: boolean;
}

export const CamerasInListView = React.memo(
  ({ data, isLoading }: CamerasInListViewProps) => {
    return (
      <ScrollArea
        orientation="both"
        scrollareathumbclassName="bg-[#777986]"
        scrollbarclassName="mt-16 bg-[#2C2C2C] rounded-full"
        className="h-full min-h-[35rem] rounded-lg bg-card p-3.5 pt-1.5 shadow"
      >
        {isLoading ? (
          <div className="h-full flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={data}
            tableCellClassName="px-3.5 py-1"
            tableHeadClassName="dark:bg-[#1D1F24]"
          />
        )}
      </ScrollArea>
    );
  }
);
