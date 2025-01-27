import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useMemo } from "react";
import { CameraType } from "@/utils";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { useLineChartContext } from "../../Context";

export function SelectCamera() {
  const { cameras, telemetryData, setTelemetryData } = useLineChartContext();
  const cameraId = telemetryData.cameraId;
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

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full font-normal">
          {`${cameraIds.length} Cameras selected`}
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
