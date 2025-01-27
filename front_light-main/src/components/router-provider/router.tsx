import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "@/App";
import UsersPage from "@/pages/users";
import RolesPage from "@/pages/roles";
import CamerasPage from "@/pages/cameras";
import NotfoundPage from "@/pages/not-found";
import AnalysePage from "@/pages/analyse";

import MapPage from "@/pages/map";
import DashboardIdPage from "@/pages/dashboard/group-id/dashboard-id";
import CameraPage from "@/pages/cameras/camera";
import DashboardsPage from "@/pages/dashboards";
import DevPage from "@/pages/dev";
import AlertsPage from "@/pages/alerts";
import NotificationsPage from "@/pages/notifications";
import LogsPage from "@/pages/log";
import SearchPage from "@/pages/search";
import WorkflowPage from "@/pages/workflow";
import WorkflowsPage from "@/pages/workflows";
import PluginPage from "@/pages/plugin";
import CamerasStream from "@/pages/streams";
import ConfigPage from "@/pages/config";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "dashboards",
        element: <DashboardsPage />,
        children: [{ path: ":dashboardId", element: <DashboardIdPage /> }],
      },
      { path: "users", element: <UsersPage /> },
      { path: "roles", element: <RolesPage /> },
      { path: "cameras", element: <CamerasPage /> },
      { path: "streamsCameras", element: <CamerasStream /> },
      { path: "cameras/:cameraId", element: <CameraPage /> },
      { path: "analyze", element: <AnalysePage /> },
      { path: "dev", element: <DevPage /> },
      { path: "log", element: <LogsPage /> },
      { path: "alerts", element: <AlertsPage /> },
      { path: "notifications", element: <NotificationsPage /> },
      { path: "search", element: <SearchPage /> },
      { path: "config", element: <ConfigPage /> },
      { path: "plugin", element: <PluginPage /> },
      {
        path:"workflow",
        element: <WorkflowsPage />,
      },
      // {
      //   path: "workflows/:cameraId",
      //   element: <WorkflowsPage />,
      // },
      { path: "/workflows/workflow/:cameraId", element: <WorkflowPage /> },
      {
        path: "/workflows/workflow/:cameraId/:workflowId",
        element: <WorkflowPage />,
      },
    ],
  },
  { path: "*", element: <NotfoundPage /> },
];

const router = createBrowserRouter(routes);

export default router;
