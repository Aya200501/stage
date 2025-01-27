import { Widget, WidgetCardCountElement, WidgetCardType } from "@/utils";
import CountOption from "./count-option";
import TelemetryOption from "./telemetry-option";
import TextOption from "./text-option";
import HistoryOption from "./history-option";

type Data = {
  type: WidgetCardType;
  content?: string;
  element?: WidgetCardCountElement;
  cameraId?: string;
  icon?: string;
  telemetryName?: string;
};

export default function CardWidget(props: Widget) {
  const { type } = props.attributes as Data;

  if (type === "text") return <TextOption {...props} />;
  if (type === "count") return <CountOption {...props} />;
  if (type === "telemetry") return <TelemetryOption {...props} />;
  if (type === "history") return <HistoryOption {...props} />;
  return type;
}
