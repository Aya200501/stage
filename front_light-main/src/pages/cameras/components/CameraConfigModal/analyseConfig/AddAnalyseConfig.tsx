/* eslint-disable @typescript-eslint/no-explicit-any */
import { useStoreAnalyse } from "./store";
import { useEffect, useMemo } from "react";
import CropImage from "./crop";
import Analyse from "./analyse";
import useSWR from "swr";
import { useGlobalContext } from "@/Context";
// import { v4 as uuid } from "uuid";
import { Button } from "@/components/ui/button";
import { env } from "@/lib/env";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AnalyseConfigProps } from "./add";
// import { useTranslation } from "react-i18next";
import { AnalyseType, getPermissionLevel } from "@/utils";
import Loader from "@/pages/dashboard/components/loader";
import { v4 as uuid } from "uuid";
export default function AddAnalyseConfig({ cameraId }: AnalyseConfigProps) {
  // const { t } = useTranslation();
  const {
    type,
    setCameraId,
    setImageSrc,
    setWidth,
    setHeight,
    setAnalyse,
    setLines,
    setPolygons,
    lines,
    rotation,
    analyse,
    crop,
    polygons,
    setRotation,
    configsSelected,
    zoom,
    setZoom,
    width,
    height,
    setCrop,
    setOpen,
    setType,
    lineNames,
    setLineNames,
    polygonNames,
    setPolygonNames,
    setConfigsSelected,
  } = useStoreAnalyse();

  const { backendApi, user, groupId } = useGlobalContext();
  const [selected, setSelected] = React.useState<string | null>(null);
  const [selectedChild, setSelectedChild] = React.useState<string[]>([]);
  const [selectEditConfig, setSelectEditConfig] = React.useState<string | null>(
    null
  );
  const [children, setChildren] = React.useState<AnalyseType[]>([]);
  const [name, setName] = React.useState<string>("");

  const permissionLevel = useMemo(
    () => getPermissionLevel(user, "CAMERA", groupId),
    [user, groupId]
  );

  const key = "analyseParents";
  const { data, isLoading } = useSWR(key, async () => {
    if (permissionLevel < 2) return [];
    const { results } = await backendApi.findMany<
      AnalyseType & {
        children: AnalyseType[];
      }
    >("analyse", {
      where: {
        parents: {
          none: {},
        },
      },
      include: {
        children: true,
      },
    });
    return results;
  });

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
    setCameraId(cameraId || null);
  }, []);

  const resetAnalyse = () => {
    setAnalyse(null);
    setLines([]);
    setPolygons([]);
    setRotation(0);
    setLineNames([]);
    setPolygonNames([]);
    setCrop(null);
  };

  // if (isLoading) return <div>{t("loading")}</div>;
  return (
    <div className="dark w-full h-full flex gap-4 flex-wrap">
      {localStorage.getItem("stream_images") &&
      JSON.parse(localStorage.getItem("stream_images") || "{}")?.[cameraId!]?.[
        "image"
      ] ? (
        type === "crop" ? (
          <CropImage />
        ) : (
          <Analyse selectEditConfig={selectEditConfig} />
        )
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">Analyse</h1>
          <p className="text-sm text-gray-500">
            {`Analyze the image to detect objects`}
          </p>
        </div>
      )}
      <div className="flex p-4 flex-col gap-4 border rounded-md w-full lg:w-[22rem] min-h-[22rem] h-fit">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2 transition-[height] duration-500">
              {(data || []).map((res) => {
                return (
                  <TooltipProvider key={res.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          key={res.id}
                          className={cn(
                            `flex flex-col gap-2 items-center justify-center p-4 border rounded-md bg-gray-500/20 
                    cursor-pointer hover:bg-gray-500/60 transition-all duration-500`,
                            {
                              "border-red-500": selected === res.id,
                            }
                          )}
                          onClick={() => {
                            if (selected !== res.id) {
                              setSelectEditConfig(null);
                              setSelectedChild([]);
                              setAnalyse(res);
                              setType(null);
                              setPolygons([]);
                              setLines([]);
                              setRotation(0);
                              setSelected(res.id);
                              setChildren(res.children);
                              setPolygonNames([]);
                              setLineNames([]);
                            } else {
                              setSelected(null);
                              setAnalyse(null);
                              setChildren([]);
                            }
                          }}
                        >
                          <img
                            src={`${env.VITE_BACKEND_API}/uploads/${res?.icon}`}
                            alt={analyse?.name}
                            className="w-8 h-8 rounded-full"
                            onError={(e) => {
                              (
                                e.target as HTMLImageElement
                              ).src = `/public/images/not_found.jpg`;
                            }}
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{res?.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              })}
            </div>
            {selected && !selectEditConfig && (
              <div className="flex flex-col gap-2">
                <h3>children</h3>
                <div className="flex gap-2 flex-wrap">
                  {children?.map((ele, index) => {
                    return (
                      <TooltipProvider key={ele.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              key={index}
                              className={cn(
                                `flex flex-col gap-2 items-center justify-center p-4 border rounded-md bg-gray-500/20 
                    cursor-pointer hover:bg-gray-500/60 transition-all duration-500`,
                                {
                                  "border-red-500": selectedChild.includes(
                                    ele.id
                                  ),
                                }
                              )}
                              onClick={() => {
                                if (selectedChild.includes(ele.id)) {
                                  setSelectedChild(
                                    selectedChild.filter((id) => id !== ele.id)
                                  );
                                  return;
                                }
                                setSelectedChild([...selectedChild, ele.id]);
                              }}
                            >
                              <img
                                src={`${env.VITE_BACKEND_API}/uploads/${ele.icon}`}
                                alt={ele.name}
                                className="w-8 h-8 rounded-full"
                                onError={(e) => {
                                  (
                                    e.target as HTMLImageElement
                                  ).src = `/public/images/not_found.jpg`;
                                }}
                              />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{ele?.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    );
                  })}
                </div>
              </div>
            )}
            {selected && !selectEditConfig && (
              <div className="flex flex-col gap-2">
                <label>Name config</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="border rounded-md p-2 dark:bg-gray-800"
                  placeholder="Name config"
                />
              </div>
            )}

            <Button
              disabled={!selected || (selectEditConfig || [])?.length > 0}
              onClick={(e) => {
                e.preventDefault();
                if (!analyse) return;
                setSelected(null);
                setConfigsSelected([
                  ...configsSelected,
                  {
                    category: analyse?.id,
                    analyses: selectedChild,
                    name: name,
                    camera: cameraId,
                    polygons,
                    lines,
                    rotation,
                    zoom,
                    width,
                    height,
                    crop,
                    polygonNames,
                    lineNames,
                  },
                ]);
                resetAnalyse();
                setOpen(false);
                name && setName("");
              }}
            >
              Add Config
            </Button>

            <div className="flex flex-col gap-1  max-h-[30rem] overflow-y-auto">
              <h3>Configs Selected</h3>
              {configsSelected.map((config, index) => {
                const newAnalyse = data?.find((a) => a.id === config.category);
                if (!newAnalyse) return null;
                return (
                  <div className="flex gap-2 w-full flex-col" key={index}>
                    <div
                      className="flex gap-4 items-center border rounded-sm p-2"
                      key={config.analyseId}
                    >
                      <img
                        src={`${env.VITE_BACKEND_API}/uploads/${newAnalyse?.icon}`}
                        alt={newAnalyse?.name}
                        className="w-5 h-5 rounded-full"
                        onError={(e) => {
                          (
                            e.target as HTMLImageElement
                          ).src = `/public/images/not_found.jpg`;
                        }}
                      />
                      <p className="w-full truncate">{config?.name}</p>
                      <Edit2Icon
                        onClick={() => {
                          setSelected(null);
                          setType(null);
                          setAnalyse(newAnalyse);
                          setZoom(config.zoom);
                          setRotation(config.rotation);
                          setLines(config.lines);
                          setPolygons(config.polygons);
                          setCrop(config.crop);
                          setWidth(config.width);
                          setHeight(config.height);
                          setLineNames(config.lineNames);
                          setPolygonNames(config.polygonNames);
                          setSelectEditConfig(config?.id);
                        }}
                        className="cursor-pointer hover:text-blue-500 "
                      />
                      <Trash2Icon
                        onClick={() => {
                          backendApi
                            .DeleteById("cameraAnalyse", config.id)
                            .then(() => {
                              setConfigsSelected(
                                configsSelected.filter(
                                  (c) => c.id !== config.id
                                )
                              );
                              resetAnalyse();
                              setOpen(false);
                            });
                        }}
                        className="cursor-pointer hover:text-red-500"
                      />
                    </div>
                    {selectEditConfig === config.id && (
                      <div className="flex gap-2 flex-col border border-xl p-2 first-letter:uppercase">
                        <div className="flex gap-1 ">
                          {data
                            ?.find((a) => a.id === config?.category)
                            ?.children?.map((ele, dx) => {
                              return (
                                <TooltipProvider key={ele.id}>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div
                                        key={dx}
                                        className={cn(
                                          `flex flex-col size-10 gap-2 items-center justify-center  border rounded-md bg-gray-500/20 
                                  cursor-pointer hover:bg-gray-500/60 transition-all duration-500 !p-0`,
                                          {
                                            "border-red-500": (
                                              configsSelected.find(
                                                (c) => c.id === selectEditConfig
                                              )?.analyses || []
                                            )?.includes(ele.id),
                                          }
                                        )}
                                        onClick={() => {
                                          setConfigsSelected(
                                            configsSelected.map((c) => {
                                              if (c.id === selectEditConfig) {
                                                return {
                                                  ...c,
                                                  analyses:
                                                    c.analyses?.includes(ele.id)
                                                      ? c.analyses?.filter(
                                                          (id: string) =>
                                                            id !== ele.id
                                                        )
                                                      : [
                                                          ...(c.analyses || []),
                                                          ele.id,
                                                        ],
                                                };
                                              }
                                              return c;
                                            })
                                          );
                                        }}
                                      >
                                        <img
                                          src={`${env.VITE_BACKEND_API}/uploads/${ele.icon}`}
                                          alt={ele.name}
                                          className="w-8 h-8  rounded-full object-cover"
                                          onError={(e) => {
                                            (
                                              e.target as HTMLImageElement
                                            ).src = `/public/images/not_found.jpg`;
                                          }}
                                        />
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{ele?.name}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              );
                            })}
                        </div>
                        <div className="flex flex-col gap-2 ">
                          <label>Name config</label>
                          <input
                            value={
                              configsSelected.find(
                                (c) => c.id === selectEditConfig
                              )?.name || ""
                            }
                            type="text"
                            className="border rounded-md p-2 dark:bg-gray-800"
                            placeholder="Name config"
                            onChange={(e) => {
                              setConfigsSelected(
                                configsSelected.map((c) => {
                                  if (c.id === selectEditConfig) {
                                    return {
                                      ...c,
                                      name: e.target.value,
                                    };
                                  }
                                  return c;
                                })
                              );
                            }}
                          />
                        </div>
                        <Button
                          type="button"
                          onClick={() => {
                            if (config.id) {
                              backendApi
                                .update("cameraAnalyse", config.id, {
                                  name: config.name,
                                  config: {
                                    analyses: config.analyses,
                                    zoom,
                                    crop,
                                    rotation,
                                    polygons: (polygons || [])
                                      .filter((pl) => pl.length > 0)
                                      .reduce(
                                        (
                                          acc: any,
                                          polygon: any,
                                          index: number
                                        ) => {
                                          acc[
                                            polygonNames[index] ||
                                              "polygone" + uuid()
                                          ] = polygon.map((p: any) => {
                                            if (!crop) return [p.x, p.y];
                                            const {
                                              x,
                                              y,
                                              width: wc,
                                              height: wh,
                                            } = crop;
                                            return [
                                              p.x * (wc / width) + x,
                                              p.y * (wh / height) + y,
                                            ];
                                          });
                                          return acc;
                                        },
                                        {}
                                      ),
                                    lines: (lines || [])
                                      ?.filter((pl) => pl.length > 0)
                                      .reduce(
                                        (
                                          acc: any,
                                          polygon: any,
                                          index: number
                                        ) => {
                                          acc[
                                            lineNames[index] ||
                                              "lines-" + uuid()
                                          ] = polygon.map((p: any) => {
                                            if (!crop) return [p.x, p.y];
                                            const {
                                              x,
                                              y,
                                              width: wc,
                                              height: wh,
                                            } = crop;
                                            return [
                                              p.x * (wc / width) + x,
                                              p.y * (wh / height) + y,
                                            ];
                                          });
                                          return acc;
                                        },
                                        {}
                                      ),
                                    width,
                                    height,
                                  },
                                })
                                .then(() => {
                                  setConfigsSelected(
                                    configsSelected.map((c) => {
                                      if (c.id === config.id) {
                                        return {
                                          ...c,
                                          analyses: config.analyses,
                                          zoom,
                                          crop,
                                          rotation,
                                          lines: lines,
                                          polygons: polygons,
                                          width,
                                          height,
                                        };
                                      }
                                      return c;
                                    })
                                  );
                                  setSelectEditConfig(null);
                                  setAnalyse(null);
                                  setLines([]);
                                  setPolygons([]);
                                  setRotation(0);
                                  setCrop(null);
                                  setType(null);
                                });
                            } else {
                              setConfigsSelected(
                                configsSelected.map((c) => {
                                  if (c.id === config.id) {
                                    return {
                                      ...c,
                                      analyses: config.analyses,
                                      zoom,
                                      crop,
                                      rotation,
                                      lines: lines,
                                      polygons: polygons,
                                    };
                                  }
                                  return c;
                                })
                              );
                              setSelectEditConfig(null);
                              setAnalyse(null);
                              setLines([]);
                              setPolygons([]);
                              setRotation(0);
                              setCrop(null);
                              setType(null);
                            }
                          }}
                        >
                          Edit Config
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
