import ParamsSearch from "@/components/params-search";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AddCameraModal } from "@/pages/cameras/components/AddCameraModal";
import React from "react";
import Grid from "@/assets/icons/grid.svg?react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Grid1 from "@/assets/icons/grid1.svg?react";
import Grid2 from "@/assets/icons/grid2.svg?react";
import Grid3 from "@/assets/icons/grid3.svg?react";
import Grid4 from "@/assets/icons/grid4.svg?react";
import { cn } from "@/lib/utils";

function Filter({
  setGrid,
}: {
  setGrid: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [activeGrid, setActiveGrid] = React.useState(1);
  return (
    <div className="flex w-full flex-wrap gap-2 [&>*]:order-2">
      <ParamsSearch className="h-10 py-0 !order-1 md:-order-none flex-[5] min-w-[17rem] max-w-[23rem] max-md:max-w-full " />
      <RadioGroup defaultValue="comfortable" className="flex mr-auto ">
        <div className="flex items-center space-x-2 border p-2 rounded-sm shadow-[0px_0px_5px_-3px]">
          <RadioGroupItem value="toutes" id="r1" />
          <Label htmlFor="r1">Toutes</Label>
        </div>
        <div className="flex items-center space-x-2 border p-2 rounded-sm shadow-[0px_0px_5px_-3px]">
          <RadioGroupItem
            value="en_ligne"
            id="r2"
            className="border-green-500"
          />
          <Label htmlFor="r2">En ligne</Label>
        </div>
        <div className="flex items-center space-x-2 border p-2 rounded-sm shadow-[0px_0px_5px_-3px]">
          <RadioGroupItem
            value="hors_ligne"
            id="r3"
            className="border-red-500"
          />
          <Label htmlFor="r3">Hors ligne</Label>
        </div>
      </RadioGroup>
      <Popover>
        <PopoverTrigger>
          <Button className="bg-[#303030] text-primary hover:bg-[#303030]">
            <Grid className="w-4 h-4 " />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[8.2rem] p-2 mr-1 flex gap-2 flex-wrap bg-transparent justify-between">
          <div className="flex flex-wrap gap-1 ">
            <div
              className={cn(
                "px-[2px] hover:bg-[#303030]/80",
                activeGrid === 1 && "bg-[#303030]/80"
              )}
              onClick={() => {
                setActiveGrid(3);
                setGrid(3);
              }}
            >
              <Grid1 className="px-1 size-[3rem] cursor-pointer" />
            </div>
            <div
              className={cn(
                "px-[2px] hover:bg-[#303030]/80",
                activeGrid === 2 && "bg-[#303030]/80"
              )}
              onClick={() => {
                setActiveGrid(2);
                setGrid(2);
              }}
            >
              <Grid2 className=" px-1 size-[3rem] cursor-pointer" />
            </div>
            <div
              className={cn(
                "px-[2px] hover:bg-[#303030]/80",
                activeGrid === 3 && "bg-[#303030]/80"
              )}
              onClick={() => {
                setActiveGrid(4);
                setGrid(4);
              }}
            >
              <Grid3 className=" px-1 size-[3rem] cursor-pointer" />
            </div>
            <div
              className={cn(
                "px-[2px] hover:bg-[#303030]/80",
                activeGrid === 4 && "bg-[#303030]/80"
              )}
              onClick={() => {
                setActiveGrid(1);
                setGrid(1);
              }}
            >
              <Grid4 className=" px-1 size-[3rem] cursor-pointer" />
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <AddCameraModal triggerSize="small" />
    </div>
  );
}

export default Filter;
