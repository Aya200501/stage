import { Filter } from "./component/filter";
// import { ScrollArea } from "@/components/ui/scroll-area";
import { LogsColumns, LogsType } from "./component/log-columns";
import { useGlobalContext } from "@/Context";
import Loader from "../dashboard/components/loader";

import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Unauthorized } from "@/components/403";
import { BallLoader } from "@/components/ball-loader";
import { useInView } from "react-intersection-observer";
import { useLogs } from "./store";
import { DataTable } from "@/components/data-table";

const PER_PAGE = 30;

const LogsPage = () => {
  const { backendApi, user, currentGroup } = useGlobalContext(); // Always called at the top
  const [isLoading, setIsLoading] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const page = useRef(1);
  const [searchParams] = useSearchParams({ search: "" });
  const { items, setItems } = useLogs(); // Always called at the top

  const ability =
    currentGroup?.getAbilityWithModel("USER", user?.isSuperAdmin) ?? 0;
  const groupIds = currentGroup?.getAllGroupIds() ?? [];
  const search = searchParams.get("search") ?? "";

  const fetcher = async () => {
    setIsLoading(true);
    const { results } = await backendApi.findMany<LogsType>("log", {
      pagination: {
        page: page.current,
        perPage: PER_PAGE,
      },
      include: {
        user: {
          select: {
            id: true,
            roles: {
              include: {
                role: {
                  select: {
                    name: true,
                    color: true,
                  },
                },
              },
            },
            image: true,
            fullName: true,
            isSuperAdmin: true,
          },
        },
      },
      where: {
        user: user?.isSuperAdmin
          ? {}
          : {
              roles: {
                some: {
                  group: { id: { in: groupIds } },
                },
              },
            },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (results.length < PER_PAGE) {
      setIsLastPage(true);
    }
    return results;
  };

  const handleSearch = async () => {
    page.current = 1;
    const results = await fetcher();
    setItems(results);
    setIsLoading(false);
    page.current++;
  };

  const loadMore = async () => {
    const results = await fetcher();
    const noDuplicates = results.filter(
      (role) => !items.find((item) => item.id === role.id)
    );
    setItems([...items, ...noDuplicates]);
    page.current++;
    setIsLoading(false);
  };

  // Reset page and items when group or search changes
  useEffect(() => {
    if (currentGroup) {
      page.current = 1;
      setItems([]);
      setIsLastPage(false);
      handleSearch();
    }
  }, [currentGroup, search]);

  // Infinite scroll logic
  useEffect(() => {
    if (isLastPage || isLoading || !inView || !currentGroup) return;
    loadMore();
  }, [inView, isLastPage, isLoading, currentGroup]);

  if (ability === 0 && currentGroup) {
    return <Unauthorized />;
  }

  return currentGroup !== undefined ? (
    <div className="w-full h-fit min-h-full flex items-center justify-center">
      <Loader />
    </div>
  ) : (
    <main className="flex flex-1 w-full flex-col gap-3 max-md:px-4 max-md:pb-4 md:gap-4">
      <Filter />
      {/* <ScrollArea
        orientation="both"
        scrollareathumbclassName="bg-[#777986]"
        scrollbarclassName="mt-16 bg-[#2C2C2C] rounded-full"
        className="h-full min-h-[35rem] rounded-lg bg-card p-3.5 pt-1.5 shadow"
      > */}
      <DataTable
        columns={LogsColumns}
        data={items}
        tableCellClassName="px-3.5 py-1"
        tableHeadClassName="dark:bg-[#1D1F24]"
      />
      {!isLoading && items.length === 0 ? null : (
        <div ref={ref} className="w-full min-h-4 h-4 relative">
          {isLoading && items.length >= PER_PAGE && <BallLoader />}
        </div>
      )}
      {/* </ScrollArea> */}
    </main>
  );
};

export default LogsPage;
