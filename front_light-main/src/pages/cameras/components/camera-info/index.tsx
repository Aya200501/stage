import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

import { useGlobalContext } from "@/Context";
import { CameraType } from "@/utils";
import useSWR from "swr";

interface CameraInfoProps {
  cameraId: string;
}

export const CameraInfo = ({ cameraId }: CameraInfoProps) => {
  const { backendApi } = useGlobalContext();
  const key = `camera-${cameraId}`;
  const { data } = useSWR(key, async () => {
    const results = await backendApi.FindById<CameraType>("camera", cameraId);

    return results;
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium gap-3 bg-[#F5F7FA]/10 text-xs text-[#F5F7FA] hover:bg-[#F5F7FA]/5 hover:text-[#F5F7FA]/70">
          <Info className="size-5" />
          View the camera details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl gap-10 flex flex-col p-10">
        <DialogHeader>
          <DialogTitle>Camera Details</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-lg font-medium space-x-4">
              Camera ID:{" "}
              <span className="text-base ml-2 text-[#ccc]">{data?.id}</span>
            </div>
            <div className="text-lg font-medium space-x-4">
              Camera Name:{" "}
              <span className="text-base ml-2 text-[#ccc]">{data?.name}</span>
            </div>
            <div className="text-lg font-medium space-x-4">
              Reference:{" "}
              <span className="text-base ml-2 text-[#ccc]">
                {data?.reference}
              </span>
            </div>
            <div className="text-lg font-medium space-x-4">
              Type:{" "}
              <span className="text-base ml-2 text-[#ccc]">{data?.type}</span>
            </div>
            <div className="text-lg font-medium space-x-4 col-span-2">
              Rtsp Link:{" "}
              <span className="text-base text-wrap line-clamp-2 text-[#ccc]">
                {data?.config.rtspLink}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
