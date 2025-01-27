import { Button } from "@/components/ui/button";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useStoreAnalyse } from "../store";

function CropImage() {
  const {
    setType,
    crop,
    canvasRef,
    setCrop,
    imageSrc,
    width,
    height,
    setLines,
    setPolygons,
  } = useStoreAnalyse();

  return (
    <div
      className="flex flex-col gap-2"
      style={{
        width: width,
      }}
    >
      <div>
        <ReactCrop
          style={{
            width: width,
            height: height,
          }}
          crop={crop || undefined}
          onChange={(crop) => {
            setCrop(crop);
            setLines([]);
            setPolygons([]);
          }}
        >
          <img
            src={(canvasRef?.toDataURL() as string) || (imageSrc as string)}
            style={{
              width: width,
              height: height,
            }}
          />
        </ReactCrop>
      </div>
      <div className="flex gap-2 [&>*]:flex-1">
        <Button
          type="button"
          className=""
          variant="outline"
          onClick={() => {
            setType(null);
            setCrop(null);
            canvasRef?.getContext("2d")?.clearRect(0, 0, width, height);
          }}
        >
          Cancel
        </Button>
        <Button
          type="button"
          className=""
          variant="outline"
          onClick={() => {
            setCrop(crop);
            setType(null);
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default CropImage;
