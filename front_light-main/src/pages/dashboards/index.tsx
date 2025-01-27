import { useGlobalContext } from "@/Context";
import { Outlet, useParams } from "react-router-dom";
import { AddDashBoardButton } from "../dashboard/components/add-dashboard-button";

export default function DashboardsPage() {
  const { currentGroup } = useGlobalContext();
  const { dashboardId } = useParams<{ dashboardId: string }>();

  return (
    <main className="flex flex-col">
      <div>test</div>
      <Outlet />
      {/* {!currentGroup && (
        <main className="grid place-content-center">
          <div className="text-5xl opacity-50">Pleas select a group</div>
        </main>
      )} */}
      {currentGroup && !dashboardId && (
        <main className=" flex justify-center items-center">
          <div className="flex flex-col gap-4 items-center text-center">
            <img src="/images/no-dashboard.svg" alt="no-dashboard" />
            <h3 className=" text-xl font-semibold">no dashboards found.</h3>
            <p>Create a dashboard to start building your own custom one.</p>
            <AddDashBoardButton>Create a dashboard</AddDashBoardButton>
          </div>
        </main>
      )}
    </main>
  );
}
