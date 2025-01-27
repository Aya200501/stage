"use client";

import { useState } from "react";

import { Logo } from "./logo";

import AlignJustify from "@/assets/icons/align-justify.svg?react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import * as SheetPrimitive from "@radix-ui/react-dialog";
import { SidebarContent } from "./sidebar-content";
import { useMediaQuery } from "@/hooks/use-media-query";

export const SideBar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!isDesktop) {
    return (
      <Sheet>
        <SheetTrigger>
          <Button className="fixed left-3 top-4 z-[30] rounded-[8px] bg-transparent p-1.5 transition-all duration-300 ease-in-out hover:bg-[#333] ">
            <AlignJustify className="cursor-pointer text-[#9E9E9E]" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex w-full max-w-[20rem] flex-col gap-8 border-none bg-[#2C2C2C] p-0 pb-4 pt-8 transition-width duration-500 sm:max-w-[20rem]"
          //   withClose={false}
        >
          <div className="flex w-full items-center px-4">
            <Logo />
            <SheetPrimitive.Close className="top-6.5 absolute right-4 bg-transparent p-1.5 opacity-70 ring-offset-background transition-all duration-300 ease-in-out  hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-secondary"></SheetPrimitive.Close>
          </div>
          <SidebarContent collapsed={false} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className="peer fixed inset-y-4 left-4 z-[20] flex w-[16rem] flex-col gap-8 rounded-lg  dark:border-none border dark:bg-[#2C2C2C] pb-4 pt-8 transition-width duration-500 aria-checked:w-[3.75rem] max-md:hidden"
      aria-checked={collapsed}
    >
      <div className="flex w-full items-center px-4">
        <Logo />
        <div
          data-state={collapsed ? "collapsed" : "expanded"}
          className="absolute left-[76%] z-[999] rounded-md bg-transparent p-1.5 transition-all duration-300 ease-in-out data-[state=collapsed]:left-[86%] data-[state=collapsed]:bg-[#1E1E1E]"
          onClick={() => setCollapsed(!collapsed)}
        >
          <AlignJustify className="cursor-pointer text-[#9E9E9E]" />
        </div>
      </div>
      <SidebarContent collapsed={collapsed} />
    </div>
  );
};
