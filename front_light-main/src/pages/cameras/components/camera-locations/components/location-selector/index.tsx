/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { GroupNodeTree } from "@/utils/group-node-tree";
import { GroupType, useCameraLocationStore } from "../../store";

interface LocationSelectorProps {
  control: any;
  name: string;
  data: GroupNodeTree[];
  placeholder: string;
  groupType: GroupType;
  disabled?: boolean;
  onSelect: (level: string) => void;
}

export const LocationSelector = ({
  data,
  name,
  control,
  groupType,
  placeholder,
  disabled = false,
  onSelect,
}: LocationSelectorProps) => {
  const { t } = useTranslation();
  const setSelectedLocations = useCameraLocationStore(
    (state) => state.setSelectedLocations
  );
  const selectedLocations = useCameraLocationStore(
    (state) => state.selectedLocations
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Select
            onValueChange={(val) => {
              field.onChange(val);
              const selectedLocation = data.find((item) => item.id === val);
              onSelect(name);
              if (selectedLocation) {
                setSelectedLocations(groupType, selectedLocation);
              }
            }}
            disabled={disabled}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger className="border-0 bg-[#383838] px-4 text-[#F5F7FA] placeholder:text-[#98A2B3] focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 capitalize">
                {selectedLocations?.[groupType]?.name || placeholder}
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-[#383838] text-[#F5F7FA] z-[509]">
              {data.length === 0 ? (
                <div className="flex items-center justify-center h-20 text-sm text-gray-300 first-letter:uppercase">
                  {t("No data found")}
                </div>
              ) : (
                data.map((item: GroupNodeTree) => (
                  <SelectItem
                    key={item.name}
                    className="focus:bg-white/10"
                    value={item.id}
                  >
                    {item.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          <FormMessage className="text-[#D22627]" />
        </FormItem>
      )}
    />
  );
};
