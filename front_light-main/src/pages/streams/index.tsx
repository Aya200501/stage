import React from "react";
import Filter from "./components/filter";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

function CamerasStream() {
  const [gridLayout, setGrid] = React.useState<number>(3);
  const [loader, setLoader] = React.useState<boolean>(true);
  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-hidden">
      <Filter setGrid={setGrid} />
      <main
        className={cn(
          "debug grid h-fit auto-rows-[3rem] grid-cols-12 text-4xl [&>*]:grid [&>*]:place-content-center overflow-y-auto gap-4",
          {
            "[&>*]:col-span-6 [&>*]:row-span-6": gridLayout === 2,
            "[&>*]:col-span-12 [&>*]:row-span-6": gridLayout === 1,
            "[&>*:first-child]:col-span-8 [&>*:first-child]:row-span-9 [&>*]:col-span-4 [&>*]:row-span-3":
              gridLayout === 3,
            "[&>*:last-child]:col-span-12 [&>*:last-child]:row-span-7 [&>*]:col-span-4 [&>*]:row-span-4":
              gridLayout === 4,
          }
        )}
      >
        {loader &&
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="border border-black"></Skeleton>
          ))}
        {!loader &&
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border border-black">
              {i + 1}
            </div>
          ))}
      </main>
    </div>
  );
}

export default CamerasStream;
