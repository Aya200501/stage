import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { usePieOptionsContext } from "../../Context";
import { CameraType } from "@/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

export function SelectCamera() {
  const { cameras, telemetryData, setTelemetryData } = usePieOptionsContext();
  const cameraId = telemetryData.cameraId;
  const { t } = useTranslation();
  const selectedCameras = useMemo(
    () => cameras.filter((item) => cameraId?.includes(item.id)),
    [cameras, cameraId]
  );
  const cameraIds = cameraId.split(",").filter((item) => item);
  console.log({ cameraIds });

  function selectCamera(camera: CameraType) {
    if (cameraIds.includes(camera.id)) {
      setTelemetryData((prev) => ({
        ...prev,
        cameraId: cameraIds.filter((id) => id !== camera.id).join(","),
      }));
    } else
      setTelemetryData((prev) => ({
        ...prev,
        cameraId: [...cameraIds, camera.id].join(","),
      }));
  }

  const camerasNames = selectedCameras.map((item) => item.name).join(", ");

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
