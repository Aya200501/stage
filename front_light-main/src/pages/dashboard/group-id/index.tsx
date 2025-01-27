import { useGlobalContext } from "@/Context";
import { Button } from "@/components/ui/button";
import { Link, Outlet, useParams } from "react-router-dom";
import useSWR from "swr";
import { AddDashBoardButton } from "../components/add-dashboard-button";
import { Group } from "@/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";

export default function GroupIdPage() {
    const { t } = useTranslation();
  const { groupId } = useParams<{ groupId: string }>();
  const { backendApi } = useGlobalContext();

  const { data, isLoading, error } = useSWR(
    `group/${groupId}/dashboards`,
    async () => {
      const result = await backendApi.FindById<Group>(
        "group",
        groupId as string,
        {
          select: {
            dashboardLayouts: true,
          },
        }
      );
      return result?.dashboardLayouts || [];
    }
  );

  const dashboards = data || [];

  // TODO: add skeleton page
  if (isLoading) return <div>{t("loading")}</div>;

  // TODO: add error page
  if (error) {
    if (error instanceof AxiosError && error.response?.status === 404)
      return (
        <div className=" h-full flex-1 grid place-content-center text-3xl opacity-50">
          Group not found
        </div>
      );
    return (
      <div className=" h-full flex-1 grid place-content-center text-3xl opacity-50">
        {error.message}
      </div>
    );
  }

  return (
    <div className=" flex-1 h-full w-full flex flex-col gap-2 ">
      <div className="flex justify-between gap-8">
        <ScrollArea className="flex-1 " orientation="horizontal">
          <div className="flex  divide-x">
            {dashboards.map((item) => (
              <Link
                to={`/${groupId}/${item.id}`}
                key={item.id}
                className="first:rounded-[0.5rem_0_0_0.5rem] last:rounded-[0_0.5rem_0.5rem_0]  bg-muted  text-muted-foreground px-3 py-2  hover:brightness-95 active:brightness-90"
              >
                <button className="max-w-40 truncate">{item.name}</button>
              </Link>
            ))}
          </div>
        </ScrollArea>
        <AddDashBoardButton />
      </div>
      <Outlet />
      {dashboards.length === 0 && (
        <div className="h-[calc(100svh-10rem)] flex justify-center items-center">
          <div className="flex flex-col gap-4 items-center text-center">
            <img src="/images/no-dashboard.svg" alt="no-dashboard" />
            <h3 className=" text-xl font-semibold">no dashboards found.</h3>
            <p>Create a dashboard to start building your own custom one.</p>
            <Button
            // onClick={addDashboard}
            >
              Create a dashboard
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
