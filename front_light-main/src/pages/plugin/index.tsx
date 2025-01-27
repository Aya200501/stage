import { useGlobalContext } from "@/Context";
import Loader from "../dashboard/components/loader";
import { Filter } from "./components/Filter";
import { DataTable } from "@/components/data-table";
import { columns } from "./components/plugin-columns";

const PluginPage = () => {
  const { currentGroup } = useGlobalContext();

  return currentGroup !== undefined ? (
    <div className="w-full h-fit min-h-full flex items-center justify-center">
      <Loader />
    </div>
  ) : (
    <main className="flex h-full w-full flex-col gap-3 max-md:px-4 max-md:pb-4 md:gap-4">
      <Filter />
      <DataTable
        columns={columns}
        data={[]}
        tableCellClassName="px-3.5 py-1"
        tableHeadClassName="dark:bg-[#1D1F24]"
      />
      {/* {!isLoading && items.length === 0 ? null : (
        <div ref={ref} className="w-full min-h-4 h-4 relative">
          {isLoading && items.length >= PER_PAGE && viewParam === "list" && (
            <BallLoader />
          )}
        </div>
      )} */}
    </main>
  );
};

export default PluginPage;
