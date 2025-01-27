import { useGlobalContext } from "@/Context";
import { useAddWidgetStore } from "../../utils/add-widget-store";
import { useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import useSWR from "swr";
import {
  CameraType,
  Mapping,
  TableDisplayForma,
  TableWidgetData,
  flatten,
  tableDisplayFormats,
} from "@/utils";
import Loader from "../loader";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table } from "@/components/table";
import { CheckIcon, MoveDownIcon, MoveUpIcon, TrashIcon } from "lucide-react";
import _ from "lodash";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTranslation } from "react-i18next";

const defaultMapping: Mapping = {
  telemetryName: "",
};

export default function TableOptions() {
  const { t } = useTranslation();
  const { data, setAttribute } = useAddWidgetStore();
  const { backendApi, groupId } = useGlobalContext();
  const [mapping, setMapping] = useState<Mapping>(defaultMapping);
  const { mappings = [] } = data.attributes as TableWidgetData;
  const { cameraId = "" } = data.attributes as TableWidgetData;

  const setCameraId = (cameraId: string) => {
    setAttribute("cameraId", cameraId);
    setAttribute("mappings", []);
    setMapping(defaultMapping);
  };

  const addMapping = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const displayName = formData.get("displayName") as string;
    const { telemetryName } = mapping;
    if (!telemetryName) return;
    setAttribute("mappings", [...mappings, { ...mapping, displayName }]);
  };

  const deleteMapping = (item: Mapping) => {
    setAttribute(
      "mappings",
      mappings.filter((mapping) => mapping.telemetryName !== item.telemetryName)
    );
  };

  const {
    data: cameras = [],
    isLoading,
    error,
  } = useSWR(`dashboard/cameras/${groupId}`, async () => {
    const res = await backendApi.findMany<CameraType>("camera", {
      select: {
        id: true,
        name: true,
        telemetries: { select: { name: true, value: true } },
      },
      pagination: { page: 1, perPage: 100 },
      where: {
        // groupId,
      },
    });
    // return res.results;
    return res.results.map((item) => {
      const telemetries: string[] = [];
      item.telemetries.forEach((t) => {
        if (typeof t.value === "object" && !Array.isArray(t.value)) {
          Object.keys(flatten({ [t.name]: t.value }))?.forEach((v) => {
            telemetries.push(v);
          });
        } else telemetries.push(t.name);
      });
      return {
        ...item,
        telemetries: telemetries,
      };
    });
  });

  const selectedCameras = useMemo(
    () => cameras.filter((item) => cameraId.split(",").includes(item.id)),
    [cameras, cameraId]
  );
  const telemetries = useMemo(() => {
    const m = new Map<
      string,
      {
        count: number;
        telemetry: string;
      }
    >();
    selectedCameras.forEach((item) => {
      item.telemetries.forEach((t) => {
        const prevCount = m.get(t)?.count || 0;
        m.set(t, {
          count: prevCount + 1,
          telemetry: t,
        });
      });
    });
    // return intersection of all telemetries
    const intersection = Array.from(m.entries()).filter(
      ([_key, value]) => value.count === selectedCameras.length
    );
    return intersection.map(([_key, value]) => value.telemetry);
  }, [selectedCameras]);
  if (isLoading)
    return (
      <main className="  grid place-content-center">
        <Loader />
      </main>
    );
  if (error)
    return (
      <main className=" grid place-content-center text-3xl text-foreground/50">
        <h3>{t("somethingError")}.</h3>
      </main>
    );

  return (
    <div className="flex flex-col">
      <Label htmlFor="cameraId" className="first-letter:uppercase">
        {t("camera")} *
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"outline"} className="justify-start mt-2">
            {selectedCameras.length > 0
              ? selectedCameras.map((item) => item.name).join(", ")
              : t("selectCamera")}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="flex flex-col z-[999] max-h-72 overflow-auto"
          align="start"
        >
          {cameras.map((item) => (
            <Button
              key={item.id}
              onClick={() => {
                const ids = cameraId
                  .split(",")
                  .filter((item) =>
                    cameras.find((camera) => camera.id === item)
                  );
                if (ids.includes(item.id)) {
                  setCameraId(ids.filter((id) => id !== item.id).join(","));
                } else {
                  setCameraId([...ids, item.id].join(","));
                }
              }}
              variant={"ghost"}
              className="justify-between"
            >
              <span>{item.name}</span>
              {cameraId.includes(item.id) && <CheckIcon size={16} />}
            </Button>
          ))}
        </PopoverContent>
      </Popover>
      <Label htmlFor="name" className="inline-block mt-4">
        {t("mappings")} *
      </Label>
      <form onSubmit={addMapping} className="grid grid-cols-2  gap-3 mt-2">
        <Select
          disabled={!cameraId}
          onValueChange={(val) => {
            setMapping((prev) => ({
              ...prev,
              telemetryName: val,
            }));
          }}
          value={mapping.displayName}
        >
          <SelectTrigger>
            <SelectValue placeholder={t("selectTelemetry")} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{t("telemetry")}</SelectLabel>
              {telemetries?.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          disabled={!cameraId || !mapping.telemetryName}
          value={mapping.displayFormat || ""}
          onValueChange={(val) => {
            setMapping((prev) => ({
              ...prev,
              displayFormat: val as TableDisplayForma,
            }));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder={`${t("select")} ${t("displayFormat")}`} />
          </SelectTrigger>
          <SelectContent>
            {tableDisplayFormats.map((item) => (
              <SelectItem key={item} value={item}>
                {t(item)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          placeholder="Display Name"
          name="displayName"
          disabled={!cameraId || !mapping.telemetryName}
        />
        <Button
          variant="outline"
          disabled={!cameraId || !mapping.telemetryName}
        >
          Add Mapping
        </Button>
      </form>
      {mappings.length > 0 && (
        <ScrollArea className="max-h-[20rem] p-2  border rounded-lg mt-6">
          <Table className="w-full text-xs  [&_th]:p-2 [&_td]:p-2 ">
            <thead>
              <tr>
                <th className="">{t("Telemetry Name")}</th>
                {/* <th>Display Name</th> */}
                <th>{t("display name")}</th>
                {/* <th>Display Format</th> */}
                <th>{t("display format")}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {mappings.map((item, index) => (
                <tr key={index}>
                  <td>{item.telemetryName}</td>
                  <td>{item.displayName || item.telemetryName}</td>
                  <td>{item.displayFormat}</td>
                  <td>{item.displayFormat}</td>
                  <td>
                    <div className="flex gap-2">
                      <Button
                        disabled={index === 0}
                        onClick={() => {
                          const newMappings = [...mappings];
                          newMappings[index] = mappings[index - 1];
                          newMappings[index - 1] = mappings[index];
                          setAttribute("mappings", newMappings);
                        }}
                        variant="ghost"
                        size="icon"
                        className="size-8"
                      >
                        <MoveUpIcon size={16} />
                      </Button>
                      <Button
                        disabled={index === mappings.length - 1}
                        onClick={() => {
                          const newMappings = [...mappings];
                          newMappings[index] = mappings[index + 1];
                          newMappings[index + 1] = mappings[index];
                          setAttribute("mappings", newMappings);
                        }}
                        variant="ghost"
                        size="icon"
                        className="size-8"
                      >
                        <MoveDownIcon size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-8 mr-2"
                        onClick={() => deleteMapping(item)}
                      >
                        <TrashIcon size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollArea>
      )}
    </div>
  );
}
