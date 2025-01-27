/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CameraConfigFormSteps } from "@/utils/constants";
import { Timelinesection } from "@/components/Timelinesection";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

import { CameraConfigSchema } from "@/utils/schemas";
import { CleanObject, getPermissionLevel } from "@/utils";
import { useGlobalContext } from "@/Context";
import useSWR from "swr";
import { useStoreAnalyse } from "./analyseConfig/store";
import { toast } from "sonner";
import AddAnalyseConfig from "./analyseConfig/AddAnalyseConfig";
import Loader from "@/pages/dashboard/components/loader";
import { v4 as uuid } from "uuid";
interface ConfigProps {
  cameraId: string;
  triggerSize: "small" | "large";
}

export const CameraConfigModal = ({ cameraId, triggerSize }: ConfigProps) => {
  const [open, setOpen] = useState(false);
  const { backendApi, user, groupId } = useGlobalContext();
  const {
    setCameraId,
    setRotation,
    setLines,
    setZoom,
    setPolygons,
    setImageSrc,
    setWidth,
    setHeight,
    setAnalysesSelectedIdStor,
    configsSelected,
    setConfigsSelected,
    setAnalysesId,
    parentSelected,
    setParentSelected,
    setPolygonNames,
    setType,
    setLineNames,
  } = useStoreAnalyse();

  const permissionLevel = useMemo(
    () => getPermissionLevel(user, "CAMERA", groupId),
    [user, groupId]
  );

  const form = useForm<FieldValues>({
    resolver: zodResolver(CameraConfigSchema),
    defaultValues: {
      analysesIdSelected: [...(parentSelected || [])],
    },
  });

  const { isLoading } = useSWR(
    `cameaAnalysedata${cameraId}${open}`,
    async () => {
      if (!open || !cameraId) return;
      const res = await backendApi.FindById<{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cameraAnalyses: any[];
      }>("camera", cameraId!, {
        select: {
          cameraAnalyses: {
            select: {
              config: true,
              cameraId: true,
              analyses: {
                select: {
                  id: true,
                },
              },
              id: true,
              name: true,
              category: {
                select: {
                  name: true,
                  icon: true,
                  id: true,
                },
              },
            },
          },
        },
      });
      return res;
    },
    {
      onSuccess: (data) => {
        const res: any[] = [];
        let lnName: string[] = [];
        let plName: string[] = [];
        data?.cameraAnalyses.forEach((item) => {
          const data = {
            id: item.id,
            category: item.category.id,
            camera: item.cameraId,
            name: item.name,
            analyses: (item?.analyses || []).map((a: any) => a.id),
            ...item.config,
            lines: Object.keys(item.config.lines || {}).map((key) => {
              lnName.push(key);
              return item.config.lines[key].map((point: number[]) => {
                let x = point[0];
                let y = point[1];
                if (item.config.crop) {
                  const {
                    x: cropX,
                    y: cropY,
                    width: wc,
                    height: hc,
                  } = item.config.crop;
                  x = (x - cropX) * (item.config.width / wc);
                  y = (y - cropY) * (item.config.height / hc);
                }
                return { x, y };
              });
            }),
            polygons: Object.keys(item.config.polygons || {}).map((key) => {
              plName.push(key);
              return item.config.polygons[key].map((point: number[]) => {
                let x = point[0];
                let y = point[1];
                if (item.config.crop) {
                  const {
                    x: cropX,
                    y: cropY,
                    width: wc,
                    height: hc,
                  } = item.config.crop;
                  x = (x - cropX) * (item.config.width / wc);
                  y = (y - cropY) * (item.config.height / hc);
                }
                return { x, y };
              });
            }),
            polygonNames: plName,
            lineNames: lnName,
          };
          res.push(data);
          lnName = [];
          plName = [];
        });
        setConfigsSelected(res);
      },
    }
  );

  const handleNext = async () => {
    const res = configsSelected
      .filter((ele) => !ele.id)
      .map((item) => {
        const {
          id,
          category,
          camera,
          analyses,
          name,
          lineNames,
          polygonNames,
          ...rest
        } = CleanObject(item);
        void camera;
        void lineNames;
        void polygonNames;
        return CleanObject({
          id,
          category: category,
          analyses: analyses,
          name,
          config: {
            ...rest,
            polygons: item?.polygons
              .filter((polygon: any) => polygon.length > 0)
              .reduce(
                (
                  acc: Record<string, number[][]>,
                  polygon: any,
                  index: number
                ) => {
                  acc[item?.polygonNames?.[index] || "polygon-" + uuid()] =
                    polygon.map((point: any) => {
                      if (!item?.crop) return [point.x, point.y];
                      const { x, y, width: wc, height: hc } = item.crop;
                      return [
                        point.x * (wc / item.width) + x,
                        point.y * (hc / item.height) + y,
                      ];
                    });
                  return acc;
                },
                {}
              ),
            lines: item?.lines
              .filter((line: any) => line.length > 0)
              .reduce(
                (acc: Record<string, number[][]>, line: any, index: number) => {
                  acc[item?.lineNames?.[index] || "line-" + uuid()] = line.map(
                    (point: any) => {
                      if (!item?.crop) return [point.x, point.y];
                      const { x, y, width: wc, height: hc } = item.crop;
                      return [
                        point.x * (wc / item.width) + x,
                        point.y * (hc / item.height) + y,
                      ];
                    }
                  );
                  return acc;
                },
                {}
              ),
          },
        });
      });
    await backendApi
      .create("cameraAnalyse/bulk/camera", {
        cameraId,
        cameraAnalyses: res,
      })
      .then(() => {
        toast.success("Add config analysis success");
        setOpen(false);
        reset();
        setOpen(false);
        setConfigsSelected([]);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
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
  }, [open, cameraId]);

  const reset = () => {
    setAnalysesId(null);
    setAnalysesSelectedIdStor([]);
    setLines([]);
    setPolygons([]);
    setZoom(1);
    setRotation(0);
    setParentSelected([]);
    setPolygonNames([]);
    setLineNames([]);
    setType(null);
    form.reset();
  };

  const configuration = true;
  // const Analysis = data ?? [];

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          reset();
          setOpen(false);
        } else {
          setCameraId(cameraId);
          setImageSrc(
            JSON.parse(localStorage.getItem("stream_images") || "{}")?.[
              cameraId!
            ]?.["image"] || null
          );
          setWidth(
            JSON.parse(localStorage.getItem("stream_images") || "{}")?.[
              cameraId!
            ]?.["width"] || 0
          );
          setHeight(
            JSON.parse(localStorage.getItem("stream_images") || "{}")?.[
              cameraId!
            ]?.["height"] || 0
          );
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          size={triggerSize === "large" ? "default" : "icon"}
          className={cn(
            "flex cursor-pointer items-center rounded-sm justify-center gap-2 text-muted-foreground ",
            triggerSize === "large" &&
              "h-8 text-nowrap bg-muted hover:bg-muted px-6 text-sm font-semibold xl:text-sm border border-[#4CAF50]",
            triggerSize === "small" &&
              "absolute left-2.5 top-2.5 size-7 bg-gray-500/50 hover:bg-gray-500/50 backdrop-blur-md"
          )}
          disabled={permissionLevel < 2}
          onClick={(e) => {
            setOpen(true);
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {configuration ? (
            <img src="/icons/puzzlePlus.svg" alt="configure" />
          ) : (
            <img src="/icons/puzzle.svg" alt="configure" />
          )}
          {triggerSize === "large" && (
            <span>
              {configuration ? "Add configuration" : "Change configuration"}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full text-sm max-w-screen-2xl h-full sm:h-fit sm:max-h-[calc(100svh_-_4rem)] flex flex-col max-sm:px-4  outline-none">
        <DialogHeader className="dark:text-white space-y-4 h-fit text-left">
          <DialogTitle>Add camera configurations</DialogTitle>
        </DialogHeader>
        <div className="flex flex-1  h-full w-full gap-6 overflow-auto">
          <div className="flex h-full w-full max-w-48 flex-col">
            {CameraConfigFormSteps.map((step, index) => (
              <Timelinesection
                key={index}
                index={index + 1}
                title={step?.title || ""}
                description={step.description}
                isActive={index === 0}
                isLast={index === CameraConfigFormSteps.length - 1}
              />
            ))}
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="flex flex-1 w-full flex-col gap-8">
              <Form {...form}>
                <ScrollArea className="flex-1">
                  <form className="flex w-full flex-col gap-5 lg:gap-7 flex-1 h-full px-4">
                    <div className="flex flex-col">
                      <h3 className="text-xl font-semibold">
                        {CameraConfigFormSteps[0]?.title}
                      </h3>
                      <p className="text-sm">
                        {CameraConfigFormSteps[0]?.description}
                      </p>
                    </div>
                    <AddAnalyseConfig cameraId={cameraId} />
                  </form>
                </ScrollArea>
              </Form>
              <div className="flex w-full items-center justify-between">
                <Button
                  className="bg-transparent px-10 text-[#F5F7FA] hover:bg-white/20 focus-visible:ring-0 focus-visible:ring-offset-0"
                  onClick={() => {
                    setOpen(false);
                    reset();
                  }}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <div className="flex items-center gap-5">
                  <Button
                    className="px-10 text-[#F5F7FA] focus-visible:ring-0 focus-visible:ring-offset-0"
                    onClick={handleNext}
                    disabled={
                      configsSelected.length === 0 ||
                      isLoading ||
                      configsSelected.every((item) => item.id)
                    }
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
