import { useAddWidgetStore } from "@/pages/dashboard/utils/add-widget-store";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { groupByOptions } from "@/utils";
import { Label } from "@/components/ui/label";

export function GroupBy() {
  const { data, setAttribute } = useAddWidgetStore();

  const groupBy = (data.attributes?.groupBy || "none") as string;
  function handleGroupByChange(val: string) {
    setAttribute("groupBy", val);
  }
  return (
    <RadioGroup
      value={groupBy}
      onValueChange={handleGroupByChange}
      className="flex gap-4"
    >
      {groupByOptions.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <RadioGroupItem value={item} id={`r${index}`} />
          <Label className="capitalize" htmlFor={`r${index}`}>
            {item}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
