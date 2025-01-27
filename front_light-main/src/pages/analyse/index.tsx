import ParamsSearch from "@/components/params-search";
import { AddAnalyseDialog } from "./components/AddAnalyseDialog";
import { useGlobalContext } from "@/Context";
import { AnalyseType, FindManyParams, getPermissionLevel } from "@/utils";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";
import { useMemo } from "react";
import Loader from "../dashboard/components/loader";
import { Unauthorized } from "@/components/403";
import { AnalyseCard } from "./components/analyse-card";

const AnalysePage = () => {
  const { backendApi, user, groupId } = useGlobalContext();
  const [searchParams] = useSearchParams({ search: "" });

  const permissionLevel = useMemo(
    () => getPermissionLevel(user, "ANALYSE", groupId),
    [user, groupId]
  );

  const search = searchParams.get("search") ?? "";

  const params: FindManyParams = {
    pagination: {
      page: 1,
      perPage: 100,
    },
    where: {
      name: { contains: search, mode: "insensitive" },
      // where parent is null
      parents: { none: {} },
    },
    include: {
      children: {
        select: {
          id: true,
          name: true,
          icon: true,
          description: true,
          configSchema: true,
          disabled: true,
          aiCode: true,
          parents: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  };

  const key = `analyse?${JSON.stringify(params)}`;
  const { data, isLoading, error } = useSWR(key, async () => {
    if (permissionLevel === 0) return [];
    const { results } = await backendApi.findMany<AnalyseType>(
      "analyse",
      params
    );
    return results.sort(
      (a, b) => (b.children?.length || 0) - (a.children?.length || 0)
    );
  });

  const Analysis = data ?? [];

  if (permissionLevel === 0) {
    return <Unauthorized />;
  }

  if (error) return <div>Error</div>;

  return (
    <main className="flex h-full w-full flex-col gap-3 max-md:px-4 max-md:pb-4 md:gap-4">
      <div className="flex items-center justify-between">
        <ParamsSearch />
        <AddAnalyseDialog
          type="new"
          mutateKey={key}
          disabled={permissionLevel < 2}
          key={JSON.stringify(data)}
        />
      </div>
      {isLoading ? (
        <div className="h-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (data || [])?.length > 0 ? (
        <div className="grid gap-5 pb-5">
          {(Analysis || []).map((item) => (
            <AnalyseCard
              key={item.id}
              analyse={item}
              mutateKey={key}
              ability={permissionLevel}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full w-full">
          <h3 className="text-2xl font-medium">No Analyse found</h3>
        </div>
      )}
    </main>
  );
};

export default AnalysePage;
