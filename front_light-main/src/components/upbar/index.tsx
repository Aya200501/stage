import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Notifications } from "./notifications";

const pathMap: Record<string, string> = {
  workflow: "workflow",
  map: "maps",
  cameras: "cameras",
  analyze: "analyze",
  roles: "roles",
  users: "users",
  alerts: "alerts",
  notifications: "notifications",
  log: "logs",
  search: "search",
};
import Logo from "@/assets/icons/logo-name.svg?react";
import Menu from "@/assets/icons/menu.svg?react";
import Full from "@/assets/icons/full.svg?react";
import MoreInfo from "@/assets/icons/moreinfo.svg?react";
import Search from "@/assets/icons/search.svg?react";
import Logs from "@/assets/icons/logs.svg?react";
import Plugin from "@/assets/icons/plugings.svg?react";
import Workflow from "@/assets/icons/workflow.svg?react";
import Cameras from "@/assets/icons/camera-2.svg?react";
import AddLicence from "@/assets/icons/add-licence.svg?react";
import AddCamera from "@/assets/icons/add-camera.svg?react";

import { Button } from "../ui/button";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { LogOutIcon } from "lucide-react";
import { useState } from "react";

export function Upbar() {
  let { pathname } = useLocation();
  pathname = pathname.split("/")[1];
  const { t } = useTranslation();
  const name = pathMap[pathname] || pathname;
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center justify-end gap-4 h-[4rem]  px-2 bg-[#191E24] border border-white border-opacity-10">
      <div className="font-medium mr-auto capitalize   divide-x-2 h-full flex [&>*]:flex [&>*]:items-center [&>*]:px-4 divide-white divide-opacity-10">
        <Link to="/">
          <Logo />
        </Link>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger>
            <Button
              variant={"ghost"}
              className="bg-transparent hover:bg-transparent active:bg-transparent"
              onClick={() => setOpen(!open)}
            >
              <Menu className="size-[1.2rem]" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2 bg-[#191E24]">
            <div className="grid grid-cols-3 gap-1 p-2">
              <Link
                onClick={() => setOpen(false)}
                to="/search"
                className="flex flex-col items-center p-2 hover:bg-white/5 h-auto rounded-sm"
              >
                <Search className="min-h-[40px]" />
                Recherche
              </Link>
              <Link
                onClick={() => setOpen(false)}
                to="/licence"
                className="flex flex-col items-center p-2 hover:bg-white/5 h-auto rounded-sm"
              >
                <Logs className="min-h-[40px]" />
                Licence
              </Link>
              <Link
                onClick={() => setOpen(false)}
                to="/log"
                className="flex flex-col items-center p-2 hover:bg-white/5 h-auto rounded-sm"
              >
                <Logs className="min-h-[40px]" />
                Logs
              </Link>
              <Link
                onClick={() => setOpen(false)}
                to="/plugin"
                className="flex flex-col items-center p-2 hover:bg-white/5 h-auto rounded-sm"
              >
                <Plugin className="min-h-[40px]" />
                Plugin
              </Link>
              <Link
                onClick={() => setOpen(false)}
                to="/workflow"
                className="flex flex-col items-center p-2 hover:bg-white/5 h-auto rounded-sm"
              >
                <Workflow className="min-h-[40px]" />
                Workflow
              </Link>
              <Link
                onClick={() => setOpen(false)}
                to="/cameras"
                className="flex flex-col items-center p-2 hover:bg-white/5 h-auto rounded-sm"
              >
                <Cameras className="min-h-[40px]" />
                Cameras
              </Link>
              <hr className="col-span-full my-3" />
              <Link
                onClick={() => setOpen(false)}
                to=""
                className="flex flex-col h-auto rounded-sm items-center p-2 bg-[#1D293A]"
              >
                <AddLicence className="min-h-[40px]" />
                Add licence
              </Link>
              <Link
                onClick={() => setOpen(false)}
                to=""
                className="flex flex-col h-auto rounded-sm items-center p-2 bg-[#1D293A]"
              >
                <AddCamera className="min-h-[40px]" />
                Add Camera
              </Link>
              <Link
                onClick={() => setOpen(false)}
                to=""
                className="flex flex-col h-auto rounded-sm items-center p-2 bg-[#1D293A]"
              >
                <Plugin className="min-h-[40px] fill-[#F7F7F7]" />
                Add Plugin
              </Link>
            </div>
          </PopoverContent>
        </Popover>
        <div className="">{t(name)}</div>
      </div>
      <Notifications />
      <div className="size-[2rem] p-2 border border-white border-opacity-10 flex items-center justify-center">
        <Button
          size="icon"
          className="relative bg-transparent hover:bg-transparent active:bg-transparent"
          onClick={() => {
            if (document.fullscreenElement) {
              document.exitFullscreen();
            } else document.documentElement.requestFullscreen();
          }}
        >
          <Full />
        </Button>
      </div>
      <Popover>
        <PopoverTrigger>
          <MoreInfo />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2 mr-1">
          <Button
            variant="ghost"
            onClick={() => {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              window.location.reload();
            }}
          >
            <LogOutIcon />
            Log Out
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
