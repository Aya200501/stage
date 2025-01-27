import { useAddWidgetStore } from "../../utils/add-widget-store";
import { WidgetCardType, widgetCardTypes } from "@/utils";
import { useCallback } from "react";
import TextOption from "./text-option";
import CountOption from "./count-option";
import TelemetryOption from "./telemetry-option";
import { IconPicker } from "@/components/icon-picker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import HistoryOption from "./history-option";
import { useTranslation } from "react-i18next";

export default function CardOptions() {
  const { t } = useTranslation();
  const { data, setAttribute } = useAddWidgetStore();

  const setCardType = (type: WidgetCardType) => {
    setAttribute("type", type);
  };

  const setIcon = (icon: string) => {
    setAttribute("icon", icon);
  };

  const type = data.attributes?.type as WidgetCardType;

  const CardOption = useCallback(() => {
    if (type === "text") return <TextOption />;
    if (type === "count") return <CountOption />;
    if (type === "telemetry") return <TelemetryOption />;
    if (type === "history") return <HistoryOption />;
    return null;
  }, [type]);

  return (
    <div className="flex flex-col gap-4">
      <IconPicker onSelect={setIcon} />

      <RadioGroup
        defaultValue={type}
        onValueChange={(value) => setCardType(value as WidgetCardType)}
      >
        {widgetCardTypes.map((item) => {
          return (
            <div key={item} className="flex items-center space-x-2">
              <RadioGroupItem value={item} id={item} />
              <Label htmlFor={item}>{t(item)}</Label>
            </div>
          );
        })}
      </RadioGroup>
      <CardOption />
    </div>
  );
}
