/* eslint-disable @typescript-eslint/no-explicit-any */
import { MoreVertical } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useStoreAnalyse } from "../analyseConfig/store";
import { useGlobalContext } from "@/Context";
import { toast } from "sonner";
export const DetailAnalyse = ({
  setOpen,
  analyseSelected,
  setCurrentStep,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  analyseSelected: any;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { setAnalysesId, setLines, setPolygons, setZoom, setCrop } =
    useStoreAnalyse();
  const { backendApi } = useGlobalContext();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-8 w-8 bg-transparent p-0 text-[#D2D4DA] transition-all duration-500 hover:bg-white/10  rounded-full">
          <MoreVertical className="size-5 stroke-2 text-gray-600 dark:text-gray-400" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="absolute -top-8 right-8 flex flex-col gap-2.5 rounded-lg border-[0.5px] border-[#ABBED1] bg-[#26323899] p-2 backdrop-blur-[12px] w-[12rem]"
      >
        <Button
          className="gap-3   text-xs hover:bg-[#FF3D00]/5 hover:text-[#FF3D00]/70"
          onClick={() => {
            analyseSelected?.id &&
              backendApi
                .DeleteById("cameraAnalyse", analyseSelected?.id)
                .then(() => {
                  setCurrentStep(0);
                  toast.success("Delete config Analyse success");
                  setOpen(false);
                });
          }}
        >
          Delete config Analyse
        </Button>
        <Button
          className="gap-3 
          bg-[#364260] hover:bg-[#364260]/5 hover:text-[#291e60]/70"
          onClick={() => {
            setCurrentStep((prev) => prev + 1);
            setAnalysesId(analyseSelected?.analyseId || null);
            analyseSelected?.config?.lines &&
              typeof analyseSelected?.config?.lines === "object" &&
              setLines(
                Object.values(analyseSelected?.config?.lines).map(
                  (ele: any) => {
                    return ele.map((point: any) => {
                      return { x: point[0], y: point[1] };
                    });
                  }
                ) || {}
              );

            analyseSelected?.config?.polygons &&
              typeof analyseSelected?.config?.polygons === "object" &&
              setPolygons(
                Object.values(analyseSelected?.config?.polygons).map(
                  (ele: any) => {
                    return ele.map((point: any) => {
                      return { x: point[0], y: point[1] };
                    });
                  }
                ) || {}
              );
            setZoom(analyseSelected?.config?.zoom || 1);
            setCrop(analyseSelected?.config?.crop || null);
          }}
        >
          Edit config Analyse
        </Button>
      </PopoverContent>
    </Popover>
  );
};
