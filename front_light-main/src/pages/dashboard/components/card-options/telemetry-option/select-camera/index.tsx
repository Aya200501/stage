import { useAddWidgetStore } from "@/pages/dashboard/utils/add-widget-store";
import { useTelemetryOptionContext } from "../Context";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { CameraType } from "@/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

export function SelectCamera() {
  const { data, setAttribute } = useAddWidgetStore();
  const { cameras } = useTelemetryOptionContext();
  const { t } = useTranslation();
  const cameraId = (data.attributes?.cameraId || "") as string;
  const cameraIds = cameraId.split(",").filter((item) => item);
  const selectedCameras = useMemo(
    () => cameras.filter((item) => cameraId?.includes(item.id)),
    [cameras, cameraId]
  );

  const camerasNames = cameras
    .filter((item) => cameraIds.includes(item.id))
    .map((item) => item.name)
    .join(", ");

  function selectCamera(camera: CameraType) {
    if (cameraIds.includes(camera.id))
      setAttribute(
        "cameraId",
        cameraIds.filter((id) => id !== camera.id).join(",")
      );
    else setAttribute("cameraId", [...cameraIds, camera.id].join(","));
    setAttribute("telemetryName", "");
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full font-normal justify-start truncate"
        >
          <span className="truncate w-full text-left">
            {cameraIds.length === 0 ? t("select camera") : camerasNames}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-[999] flex flex-col">
        {cameras.map((camera, index) => (
          <Button
            key={index}
            variant={"ghost"}
            onClick={() => selectCamera(camera)}
            className="justify-start"
          >
            <span className="w-8">
              {selectedCameras.find((item) => item.id === camera.id) && (
                <CheckIcon size={16} />
              )}
            </span>
            <span>{camera.name}</span>
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
