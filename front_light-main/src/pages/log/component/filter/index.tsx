import ParamsSearch from "@/components/params-search";

export const Filter = () => {
  return (
    <div className="flex w-full items-center justify-between gap-[10px]">
      <div className="flex items-center gap-[10px]">
        <ParamsSearch className="min-w-[17rem]" />
      </div>
    </div>
  );
};
