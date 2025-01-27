import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAddWidgetStore } from "../../utils/add-widget-store";
import WidgetTypeSelector from "../widget-type-selector";
import { useGridStore } from "../../utils/grid-store";
import WidgetLogo from "../widget-logo";
import { useTranslation } from "react-i18next";

export function Step1() {
  const { t } = useTranslation();
  const { data, setTitle, setDescription } = useAddWidgetStore();
  const { widgetId } = useGridStore();
  return (
    <div className="place-content-center ">
      <Label>{t("title")}</Label>
      <Input
        autoFocus
        id="title"
        name="title"
        value={data.title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Label className="inline-block mt-4">
        {t("description")} <span className="text-gray-400">({t("optional")})</span>
      </Label>
      <Textarea
        id="description"
        name="description"
        value={data.description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Label className="mt-4 inline-block">{t("charType")}</Label>
      {widgetId == "new" ? (
        <WidgetTypeSelector />
      ) : (
        <WidgetLogo
          type={data.type}
          className=" bg-transparent py-4 [&>*]:mx-auto  [&>*]:w-32 mt-2   mx-auto"
        />
      )}
    </div>
  );
}
