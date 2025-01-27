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
import { Group } from "@/utils";
import React from "react";
import { useTranslation } from "react-i18next";

interface LocationSelectFormProps {
  control: any;
  name: string;
  data: Group[];
  placeholder: string;
  disabled?: boolean;
  onChange: (key: string) => void;
}

export const LocationSelectForm = React.memo(
  ({
    data,
    name,
    control,
    placeholder,
    disabled = false,
    onChange,
  }: LocationSelectFormProps) => {
    const { t } = useTranslation();
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <Select
              disabled={disabled}
              onValueChange={(val) => {
                field.onChange(val);
                onChange(name);
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="border-0 bg-[#383838] px-4 text-[#F5F7FA] placeholder:text-[#98A2B3] focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                  {data.find((item) => item.id === field.value)?.name ||
                    placeholder}
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-[#383838] text-[#F5F7FA] z-[509]">
                {data.length === 0 ? (
                  <div className="flex items-center justify-center h-20 text-sm text-gray-300 first-letter:uppercase">
                    {t("No data found")}
                  </div>
                ) : (
                  data.map((region: Group) => (
                    <SelectItem
                      key={region.name}
                      className="focus:bg-white/10"
                      value={region.id}
                    >
                      {region.name}
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
  }
);
