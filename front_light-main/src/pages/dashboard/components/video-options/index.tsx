import { useGlobalContext } from "@/Context";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddWidgetStore } from "@/pages/dashboard/utils/add-widget-store";
import useSWR from "swr";
import { CameraType, VideoWidgetData, videoTypes } from "@/utils";
import { Input } from "@/components/ui/input";
import Loader from "../loader";
import { useTranslation } from "react-i18next";

export function VideoOptions() {
  const { t } = useTranslation();
  const { backendApi, groupId } = useGlobalContext();
  const { data, setAttribute } = useAddWidgetStore();

  const {
    cameraId = "",
    type = "mp4",
    url = "",
  } = data.attributes as VideoWidgetData;

  const setCameraId = (val: string) => {
    setAttribute("cameraId", val);
  };
  const setType = (val: string) => {
    setAttribute("type", val);
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
    return res.results;
  });

  if (isLoading) {
    return (
      <div className="py-6 grid place-content-center">
        <Loader />
      </div>
    );
  }
  if (error) {
    return <div>{t("somethingError")}</div>;
  }

  return (
    <div>
      <Label htmlFor="video-type">Type</Label>
      <Select value={type} onValueChange={setType}>
        <SelectTrigger>
          <SelectValue placeholder="Select Type" />
        </SelectTrigger>
        <SelectContent>
          {videoTypes.map((item) => (
            <SelectItem value={item} key={item}>
              {t(item)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {(type === "camera" || type === "ws") && (
        <>
          <Label htmlFor="camera" className="inline-block mt-4 first-letter:uppercase">
            {t("camera")}
          </Label>
          <Select value={cameraId} onValueChange={setCameraId}>
            <SelectTrigger>
              <SelectValue placeholder={t("selectCamera")} />
            </SelectTrigger>
            <SelectContent>
              {cameras.map((item) => (
                <SelectItem value={item.id} key={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      )}
      {(type === "mp4" || type === "m3u8") && (
        <>
          <Label className="mt-4 inline-block first-letter:uppercase">{t("url")}</Label>
          <Input
            className="mt-2"
            placeholder="url"
            value={url}
            onChange={(e) => {
              setAttribute("url", e.target.value);
            }}
          />
        </>
      )}
    </div>
  );
}
