import { VideoWidgetData, Widget } from "@/utils";
import CameraOption from "./camera-option";
import StaticOption from "./static-option";

export default function VideoWidget(props: Widget) {
  const { type } = props.attributes as VideoWidgetData;

  if (type === "camera") return <CameraOption {...props} />;

  return <StaticOption {...props} />;
}
