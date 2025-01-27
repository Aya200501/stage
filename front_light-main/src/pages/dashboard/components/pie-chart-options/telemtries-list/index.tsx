import { useAddWidgetStore } from "@/pages/dashboard/utils/add-widget-store";
import { usePieOptionsContext } from "../Context";
import { LineChartWidgetData } from "@/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table } from "@/components/table";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

export function TelemetriesList() {
  const { cameras } = usePieOptionsContext();
  const { t } = useTranslation();
  const { data, deleteTelemetry } = useAddWidgetStore();
  const { telemetries = [] } = data.attributes as LineChartWidgetData;

  return (
    <ScrollArea className="max-h-[20rem] p-2  border rounded-lg">
      <Table className="w-full text-xs [&_th]:p-3">
        <thead>
          <tr>
            <th>{t("camera")}</th>
            <th>{t("telemetry")}</th>
            <th>{t("label")}</th>
            <th>{t("calculation")}</th>
            <th>{t("filter value")}</th>
            <th>{t("color")}</th>
          </tr>
        </thead>
        <tbody>
          {telemetries.map((item, index) => {
            let cameraName: string = "";
            const cameraIds = item.cameraId.split(",").filter((item) => item);
            const firstCamera = cameras.find(
              (camera) => camera.id === cameraIds[0]
            );
            cameraName = firstCamera?.name || "";
            if (cameraIds.length > 1) {
              cameraName += ` (+${cameraIds.length - 1})`;
            }
            return (
              <tr key={index}>
                <td>{cameraName}</td>
                <td>{item.name}</td>
                <td>{item.label || item.name}</td>
                <td>{item.type}</td>
                <td>{item.filterValue}</td>
                <td>
                  <div className="flex items-center gap-4 justify-between">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-8"
                      onClick={() => {
                        deleteTelemetry(item, index);
                      }}
                    >
                      <TrashIcon size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
