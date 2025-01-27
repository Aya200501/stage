import {
  // BellIcon,
  CctvIcon,
  FileTextIcon,
  LucideIcon,
  MapPinnedIcon,
  ScanFaceIcon,
  SearchIcon,
  TriangleAlertIcon,
  UserCogIcon,
  UsersIcon,
} from "lucide-react";

export type Route = {
  to: string;
  Icon: LucideIcon;
  name: string;
};

export const routes: Route[] = [
  {
    to: "/map",
    Icon: MapPinnedIcon,
    name: "maps",
  },
  {
    to: "/cameras",
    Icon: CctvIcon,
    name: "cameras",
  },
  {
    to: "/analyze",
    Icon: ScanFaceIcon,
    name: "analyze",
  },
  // {
  //   to: "/video",
  //   Icon: FileVideoIcon,
  //   name: "tach video",
  // },
  {
    to: "/roles",
    Icon: UserCogIcon,
    name: "roles",
  },
  {
    to: "/users",
    Icon: UsersIcon,
    name: "users",
  },
  {
    to: "/alerts",
    Icon: TriangleAlertIcon,
    name: "alerts",
  },
  // {
  //   to: "/notifications",
  //   Icon: BellIcon,
  //   name: "notification",
  // },
  {
    to: "/log",
    Icon: FileTextIcon,
    name: "logs",
  },
  // {
  //   to: "/workflow",
  //   Icon: Workflow,
  //   name: "workflow",
  // },
  {
    to: "/search",
    Icon: SearchIcon,
    name: "search",
  },
];
