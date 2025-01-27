import { StatusButton } from "@/components/StatusButton";
import ParamsSearch from "@/components/params-search";
import { NotificationsStatuses } from "@/utils/constants";

export const Filter = () => {
  return (
    <section className="flex w-full flex-wrap items-center gap-2.5">
      <ParamsSearch className="h-10 py-0 min-w-[17rem] max-xl:flex-[5] max-xl:max-w-full" />
      {NotificationsStatuses.map((status) => (
        <StatusButton
          {...status}
          key={status.value}
          handler={() => {}}
          className="max-xl:flex-1"
        />
      ))}
      <div className="flex h-10 min-w-64 items-center justify-between gap-3 rounded-lg bg-muted px-6 text-xs  font-medium text-muted-foreground max-xl:flex-1 xl:ml-auto 2xl:text-sm">
        Notifications
        <span className="text-lg font-semibold text-[#4CAF50]">124</span>
      </div>
    </section>
  );
};
