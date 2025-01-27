import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddWidgetStore } from "@/pages/dashboard/utils/add-widget-store";
import { widgetCardCountElements } from "@/utils";
import { t } from "i18next";

export default function CountOption() {
  const { data, setAttribute } = useAddWidgetStore();

  const setCardElement = (element: string) => {
    setAttribute("element", element);
  };

  const element = (data.attributes?.element || "") as string;
  return (
    <Select value={element} onValueChange={(value) => setCardElement(value)}>
      <SelectTrigger className="w-full capitalize">
        <SelectValue placeholder={t("element")} className="text-[#7f7f7f]" />
      </SelectTrigger>
      <SelectContent>
        {widgetCardCountElements.map((item) => (
          <SelectItem value={item}>{item}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
