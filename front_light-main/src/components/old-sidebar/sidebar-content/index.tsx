/* eslint-disable react-refresh/only-export-components */
"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

import { EllipsisVertical } from "lucide-react";
import { SidebarSection } from "./sidebar-section";
import { useLocation } from "react-router-dom";
import { useGlobalContext } from "@/Context";
import CameraIcon from "@/assets/icons/camera.svg?react";
import LogIcon from "@/assets/icons/log.svg?react";

import {
  Users,
  Bell,
  Bookmark,
  FileText,
  LayoutGrid,
  MapPinned,
  ScanFace,
  Search,
  TriangleAlert,
  UserCog,
} from "lucide-react";

export const sidebarSections = [
  {
    path: "/",
    title: "Dashboard",
    icon: LayoutGrid,
  },
  {
    icon: Search,
    title: "Recherche",
    path: "/search",
  },
  {
    icon: MapPinned,
    title: "Map",
    path: "/map",
  },
  {
    icon: CameraIcon,
    title: "Caméras",
    path: "/cameras",
    iconType: "fill",
  },
  {
    icon: TriangleAlert,
    title: "Alertes",
    path: "/alerts",
  },
  {
    icon: Bookmark,
    title: "Tâche vidéo",
    path: "/vedio-task",
  },
  {
    icon: UserCog,
    title: "Rôles",
    path: "/roles",
  },
  {
    icon: FileText,
    title: "Licence",
    path: "/licence",
  },
  {
    icon: LogIcon,
    title: "Log",
    path: "/logs",
    iconType: "fill",
  },
  {
    icon: ScanFace,
    title: "analyse",
    path: "/analyse",
  },
  {
    icon: Users,
    title: "Users",
    path: "/users",
  },
  {
    icon: Bell,
    title: "notifications",
    path: "/notifications",
  },
];

interface SidebarContentProps {
  collapsed: boolean;
}

export const SidebarContent = ({ collapsed }: SidebarContentProps) => {
  const { pathname } = useLocation();
  const { user } = useGlobalContext();

  return (
    <>
      <ScrollArea
        className="relative h-full px-4"
        scrollareathumbclassName="w-2"
        scrollbarclassName="w-1.5 !right-1"
      >
        <div className="flex flex-col gap-8">
          {sidebarSections &&
            sidebarSections.map((section, index) => (
              <SidebarSection
                key={index}
                section={section}
                pathname={pathname}
              />
            ))}
        </div>
      </ScrollArea>
      <div
        data-state={collapsed ? "collapsed" : "expanded"}
        className="group flex w-full items-center px-1 transition-all duration-700 ease-in-out data-[state=expanded]:px-3"
      >
        <div className="flex w-full max-w-full items-center gap-4 rounded-lg bg-transparent p-2.5 transition-all duration-700 ease-in-out group-data-[state=expanded]:bg-gray-500/10">
          <div className="relative min-h-8 min-w-8">
            <img
              alt="User Avatar"
              src="/images/userAvatar.png"
              style={{
                objectFit: "cover",
              }}
            />
          </div>
          <div className="flex min-h-fit flex-1 items-center justify-between truncate">
            <div className="flex min-w-0 flex-1 flex-col items-start justify-start text-xs font-semibold [&>*]:w-full [&>*]:truncate">
              <span className="capitalize ">{user?.fullName}</span>
              <span className="text-[#808080]">{user?.email}</span>
            </div>
            <EllipsisVertical
              data-state={collapsed ? "collapsed" : "expanded"}
              className=" cursor-pointer whitespace-nowrap text-[#808080] transition-all duration-500 hover:text-[#808080]/90 data-[state=collapsed]:size-0 data-[state=expanded]:size-5"
            />
          </div>
        </div>
      </div>
    </>
  );
};
