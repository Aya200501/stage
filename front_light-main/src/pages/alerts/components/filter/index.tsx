// import { HistoricalAlertStatuses } from "@/utils/constants";

// import { StatusButton } from "@/components/StatusButton";
import ParamsSearch from "@/components/params-search";
import { memo } from "react";

export const Filter = memo(() => {
  return (
    <div className="flex w-full flex-wrap gap-2 [&>*]:order-2">
      <ParamsSearch className="h-10  min-w-[17rem] " />
      {/* <ParamsSearch className="h-10 py-0 !order-1 md:-order-none flex-[4] min-w-[17rem] max-w-full" /> */}
      {/* {HistoricalAlertStatuses.map((status) => (
        <StatusButton
          {...status}
          key={status.value}max-w-full
          handler={() => {}}
          className="flex-[1] "
        />
      ))}
      <div className="flex h-10 flex-[3] items-center justify-between gap-3 text-nowrap rounded-lg bg-muted px-6 text-sm font-medium text-muted-foreground">
        Verified Alerts
        <span className="text-lg font-semibold text-[#4CAF50]">87</span>
      </div>
      <div className="flex h-10 flex-[3] items-center justify-between gap-3 text-nowrap rounded-lg bg-muted px-6 text-sm font-medium text-muted-foreground ">
        Unverified Alerts
        <span className="text-lg font-semibold text-[#FF3D00]">162</span>
      </div> */}
    </div>
  );
});
