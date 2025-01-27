import React, { useEffect } from "react";
import { Crop, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStoreAnalyse } from "../store";
import Rotate from "@/assets/icons/rotate.svg?react";
import Polygon from "@/assets/icons/polygon.svg?react";
import Polyline from "@/assets/icons/polyline.svg?react";
import DialogSavePoline from "../../../save-polines";
import { Input } from "@/components/ui/input";
export default function Analyse({
  selectEditConfig,
}: {
  selectEditConfig: string | null;
}) {
  const [checkRotation, setCheckRotation] = React.useState<boolean>(false);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const {
    type,
    setType,
    imageSrc,
    zoom,
    setCanvasRef,
    setZoom,
    crop,
    setCrop,
    setImageSrc,
    rotation,
    setRotation,
    cameraId,
    lines,
    setLines,
    polygons,
    setPolygons,
    analyse,
    width,
    setWidth,
    height,
    setHeight,
    open,
  } = useStoreAnalyse();

  useEffect(() => {
    if (!open || !cameraId) return;
    setImageSrc(
      JSON.parse(localStorage.getItem("stream_images") || "{}")?.[cameraId!]?.[
        "image"
      ] || null
    );
    setWidth(
      JSON.parse(localStorage.getItem("stream_images") || "{}")?.[cameraId!]?.[
        "width"
      ] || 0
    );
    setHeight(
      JSON.parse(localStorage.getItem("stream_images") || "{}")?.[cameraId!]?.[
        "height"
      ] || 0
    );
    setCanvasRef(canvasRef.current!);
  }, [cameraId, open]);

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    if (!context || !canvasRef?.current) return;
    if (type === "line" || type === "polygon") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handleMouseUp = (e: any) => {
        if (!canvasRef?.current) return;
        const rect = canvasRef?.current.getBoundingClientRect();
        const newClick = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
        if (type === "line") {
          const newArr = [...lines];
          const index = newArr.length > 0 ? newArr.length - 1 : 0;
          if (newArr[index].length < 2) {
            //   newArr.push([newClick]);
            // } else {
            newArr[index].push(newClick);
          }
          setLines(newArr);
        } else if (type === "polygon") {
          if (polygons.length > 0) {
            const newArr = [...polygons];
            const index = newArr.length > 0 ? newArr.length - 1 : 0;
            newArr[index] = [...(newArr[index] || []), newClick];
            setPolygons(newArr);
          }
        }
      };
      canvasRef.current.addEventListener("mouseup", handleMouseUp);
      return () => {
        canvasRef.current?.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [lines, polygons, type]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas?.getContext("2d");
    if (!context) return;
    canvas.width = width;
    canvas.height = height;
    if (!context) return;

    const img =
      JSON.parse(localStorage.getItem("stream_images") || "{}")?.[cameraId!]?.[
        "image"
      ] || null;
    if (!img) return;
    const image = new Image();
    image.src = img;
    image.onload = () => {
      if (!canvas || !context) return;
      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Save the context state
      context.save();

      // Apply transformations: translate to center, rotate, then zoom
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      context.translate(centerX, centerY);
      context.rotate((rotation * Math.PI) / 180);
      context.scale(zoom, zoom);
      context.translate(-centerX, -centerY);

      const { x, height, width, y } = crop || {};
      context.drawImage(
        image,
        x || 0,
        y || 0,
        width || canvas.width,
        height || canvas.height,
        0,
        0,
        canvas.width,
        canvas.height
      );
      context.restore();
      const drawPolygons = (
        polygons: {
          x: number;
          y: number;
        }[][]
      ) => {
        context.beginPath();
        context.fillStyle = "rgba(100,100,100,0.5)";
        (polygons || [])?.forEach((polygon) => {
          if (polygon.length > 0) {
            context.strokeStyle = "#df4b26";
            context.lineWidth = 4;
            context.moveTo(polygon[0].x, polygon[0].y);
            polygon.slice(1).forEach((point) => {
              context.fillStyle = "rgba(100,100,100,0.5)";
              context.lineTo(point.x, point.y);
            });
            context.fillStyle = "rgba(100,100,100,0.5)";
            context.closePath();
          }
        });
        context.stroke();
      };
      const drawLines = (
        lines: {
          x: number;
          y: number;
        }[][]
      ) => {
        context.fillStyle = "rgba(100,100,100,0.5)";
        context.strokeStyle = "#df4b26";
        context.lineWidth = 4;
        context.beginPath();
        lines.forEach((line) => {
          if (line.length > 0) {
            context.moveTo(line[0].x, line[0].y);
            (line.slice(1) || [])?.forEach((point) => {
              context.lineTo(point.x, point.y);
            });
          }
        });
        context.stroke();
      };

      drawPolygons(polygons);
      drawLines(lines);
    };
  }, [
    selectEditConfig,
    polygons,
    lines,
    zoom,
    rotation,
    imageSrc,
    crop,
    type,
    cameraId,
    width,
    open,
    height,
  ]);

  return (
    <div
      className={`relative flex `}
      style={{
        width: width,
        height: height,
      }}
    >
      <canvas ref={canvasRef} width={width} height={height} />
      <div className="absolute top-2 left-2 flex flex-col gap-2">
        <Button
          className={`bg-[#383838] p-1 size-10 ${
            type === "line" ? "bg-[#000]" : ""
          }`}
          disabled={
            !analyse?.configSchema.analyseConfigs.includes("polyline") ||
            (type === "line" && lines?.[lines?.length - 1]?.length > 1) ||
            (type === "polygon" && polygons?.[polygons?.length - 1]?.length > 1)
          }
          onClick={(e) => {
            e.preventDefault();
            setType("line");
            setLines([...lines, []]);
          }}
        >
          <span>
            <Polyline />
          </span>
        </Button>
        <Button
          className={`bg-[#383838] p-1 size-10 ${
            type === "polygon" ? "bg-[#000]" : ""
          }`}
          disabled={
            !analyse?.configSchema.analyseConfigs.includes("polygon") ||
            (type === "line" && lines?.[lines?.length - 1]?.length > 1) ||
            (type === "polygon" && polygons?.[polygons?.length - 1]?.length > 1)
          }
          onClick={(e) => {
            e.preventDefault();
            setType("polygon");
            setPolygons([...polygons, []]);
          }}
        >
          <span>
            <Polygon />
          </span>
        </Button>
        <Button
          type="button"
          className={`bg-[#383838] p-1 size-10 ${
            type === "crop" ? "bg-[#000]" : ""
          }`}
          disabled={
            !analyse?.configSchema.analyseConfigs.includes("crop") ||
            (type === "line" && lines?.[lines?.length - 1]?.length > 1) ||
            (type === "polygon" && polygons?.[polygons?.length - 1]?.length > 1)
          }
          onClick={(e) => {
            e.preventDefault();
            setType("crop");
          }}
        >
          <span>
            <Crop />
          </span>
        </Button>
        <div className="flex gap-2 relative">
          <Button
            className={`bg-[#383838] p-1 size-10 ${
              type === "rotate" ? "bg-[#000]" : ""
            }`}
            disabled={
              !analyse?.configSchema.analyseConfigs.includes("rotate") ||
              (type === "line" && lines?.[lines?.length - 1]?.length > 1) ||
              (type === "polygon" &&
                polygons?.[polygons?.length - 1]?.length > 1)
            }
            onClick={(e) => {
              e.preventDefault();
              setCheckRotation((prev) => !prev);
            }}
          >
            <span>
              <Rotate />
            </span>
          </Button>
          {checkRotation && (
            <Input
              className="absolute top-0 w-[4rem] left-[3rem] bg-[#383838] text-white"
              type="number"
              min={0}
              max={360}
              value={rotation}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setRotation(parseInt(e.target.value));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setCheckRotation(false);
                }
              }}
            />
          )}
        </div>

        <Button
          className={`bg-[#383838] p-1 size-10 ${
            type === "zoomOut" ? "bg-[#000]" : ""
          }`}
          disabled={
            !analyse?.configSchema.analyseConfigs.includes("scale-up") ||
            (type === "line" && lines?.[lines?.length - 1]?.length > 1) ||
            (type === "polygon" && polygons?.[polygons?.length - 1]?.length > 1)
          }
          onClick={(e) => {
            e.preventDefault();
            setZoom(zoom * 1.2);
          }}
        >
          <span>
            <ZoomIn />
          </span>
        </Button>
        <Button
          className={`bg-[#383838] p-1 size-10 ${
            type === "zoomIn" ? "bg-[#000]" : ""
          }`}
          disabled={
            !analyse?.configSchema.analyseConfigs.includes("scale-down") ||
            (type === "line" && lines?.[lines?.length - 1]?.length > 1) ||
            (type === "polygon" && polygons?.[polygons?.length - 1]?.length > 1)
          }
          onClick={(e) => {
            e.preventDefault();
            setZoom(zoom / 1.2);
          }}
        >
          <span>
            <ZoomOut />
          </span>
        </Button>
      </div>
      <Button
        type="button"
        className="absolute top-2 right-2 bg-[#383838]"
        onClick={() => {
          setType(null);
          setLines([]);
          setPolygons([]);
          setZoom(1);
          setCrop(null);
          canvasRef.current?.getContext("2d")?.clearRect(0, 0, width, height);
        }}
      >
        Clear
      </Button>
      {(type === "line" || type === "polygon") && <DialogSavePoline />}

      <div className="hidden">
        <img
          src={imageSrc as string}
          alt=""
          width={width}
          height={height}
          className="object-contain"
        />
      </div>
    </div>
  );
}
