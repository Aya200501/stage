import { Button } from "@/components/ui/button";

import { MapPin, Play, Workflow } from "lucide-react";
import { AnalyseType, CameraType } from "@/utils/api-types";
import { useNavigate } from "react-router-dom";
import { CameraConfigModal } from "./CameraConfigModal";
import { cn } from "@/lib/utils";
import { CameraActions } from "./camera-actions";
import { useGlobalContext } from "@/Context";
import { getCameraLocation } from "@/utils/functions";
import { env } from "@/lib/env";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CameraProps {
  data: CameraType;
}
export const Camera = ({ data }: CameraProps) => {
  const { id, name, model, type, group, cameraAnalyses } = data;
  const { setCameraName, user } = useGlobalContext();
  const navigate = useNavigate();

  const analysis: AnalyseType[] =
    cameraAnalyses?.flatMap((analysis) => analysis.analyses) ?? [];

  return (
    <div className="flex flex-col  rounded-lg bg-muted dark:brightness-125 relative hover:z-10 ">
      <div className="relative h-[11.5rem] w-full">
        <img
          src={
            localStorage.getItem("stream_images") &&
            JSON.parse(localStorage.getItem("stream_images") as string)?.[id]
              ? JSON.parse(localStorage.getItem("stream_images") as string)?.[
                  id
                ]?.["image"]
              : "/icons/noImage.svg"
          }
          alt="camera"
          className={cn("h-full w-full object-cover", {
            "object-contain": !JSON.parse(
              localStorage.getItem("stream_images") as string
            )?.[id],
          })}
        />
        {/* <div
          data-state={status === "online" ? "online" : "offline"}
          className="group absolute right-2.5 top-2.5 flex h-7 items-center justify-center gap-2.5 rounded-lg bg-gray-500/50 backdrop-blur-md  p-3 text-xs font-semibold text-[#FF3D00] data-[state=online]:text-green-600"
        >
          <span className="size-2 rounded-full bg-[#FF3D00] group-data-[state=online]:bg-[#4CAF50]" />
          {status === "online" ? t("online") : t("offline")}
        </div> */}
        <CameraConfigModal cameraId={id} triggerSize="small" />
        {user?.isSuperAdmin && (
          <Button
            size={"icon"}
            className="absolute right-2.5 top-2.5 size-7 bg-gray-500/30 p-1   hover:bg-gray-500/30 shadow-md scale-100 hover:scale-105 transition-all duration-500"
            onClick={() => {
              navigate(`/workflows/${id}`);
            }}
          >
            <Workflow size={30} color="#9d9393" />
          </Button>
        )}
        <Button
          className="z-[9] absolute size-[5rem] rounded-full 
       top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-500/30 p-3 cursor-pointer flex items-center justify-center
        hover:bg-primary/30 transition-all duration-500
        hover:scale-105 scale-100 
        "
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setCameraName && setCameraName(name || "");
            navigate(`/cameras/${id}`);
          }}
        >
          <Play className="size-12 stroke-2 text-[#4CAF50]" />
        </Button>
      </div>
      <div className="flex-1 flex w-full flex-col gap-1 px-4 py-3 pb-1">
        <div className="flex w-full items-center justify-between">
          {name}
          <CameraActions camera={data} />
        </div>
        <div className="flex items-center gap-1.5 text-sm font-medium capitalize">
          <MapPin className="size-4 text-[#2196F3]" />
          <span>{getCameraLocation(group)}</span>
        </div>
        <div className="flex items-center justify-between gap-2 text-sm">
          <span className="text-[#D2D4DA]">{type}</span>
          <span className="flex h-7 items-center justify-center rounded-lg bg-[#2196F3]/10 p-2 font-semibold text-[#2196F3]">
            {model}
          </span>
        </div>
        <ScrollArea
          className="flex"
          orientation="both"
          scrollbarclassName=" mb-2.5 h-1.5"
        >
          <div className="flex gap-2">
            {analysis.map((analyse, index) => (
              <div key={index} className="size-12 p-1 relative">
                <img
                  src={`${env.VITE_BACKEND_API}/uploads/${analyse.icon}`}
                  alt={analyse.name}
                  onError={(e) => {
                    e.currentTarget.src = "/icons/noImage.svg";
                  }}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
