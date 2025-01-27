import { useGlobalContext } from "@/Context";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { Group } from "@/utils";
import useSWR from "swr";
import { Outlet } from "react-router-dom";
import { GroupSelector } from "./components/group-selector";
import { useTranslation } from "react-i18next";

const params = {
  pagination: { page: 1, perPage: 12 },
  where: { type: "REGION" },
  select: {
    id: true,
    name: true,
    subGroups: {
      select: {
        id: true,
        name: true,
        subGroups: {
          select: {
            id: true,
            name: true,
            subGroups: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    },
  },
};

export default function DashboardPage() {
    const { t } = useTranslation();
  const { backendApi } = useGlobalContext();

  const { data, isLoading, error } = useSWR("dashboard-groups", async () => {
    const { results } = await backendApi.findMany<Group>("group", params);
    return results;
  });

  const groups = data || [];

  // TODO: add skeleton page
  if (isLoading) return <div>{t("loading")}</div>;

  // TODO: add error page
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className=" flex flex-col gap-3 pb-4 sm:gap-4  w-full  h-fit min-h-full">
      <div className="z-20 flex w-full items-center justify-between bg-background/80 m md:bg-transparent transition-colors max-md:top-0 max-md:px-4 max-md:py-5">
        <h3 className="text-2xl font-medium max-md:pl-11 first-letter:uppercase">{t("dashboard")}</h3>
        <GroupSelector
          groups={groups}
          variant="outline"
          className="gap-2 w-56 shrink-0 justify-between"
        />
        <ThemeModeToggle />
      </div>
      <Outlet />
    </div>
  );
}
