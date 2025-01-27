import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Control, FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  control: Control<FieldValues, unknown>;
  placeholder: string;
  label: string;
  name: string;
  isRequired?: boolean;
  className?: string;
}

export const FormInput = ({
  control,
  placeholder,
  label,
  name,
  isRequired = false,
  className = "",
  ...props
}: FormInputProps) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium text-[#F5F7FA]">
            {label}
            {isRequired && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <div className="flex flex-col gap-2">
              <Input
                {...field}
                {...props}
                placeholder={placeholder}
                className={cn(
                  "border-0 bg-[#383838] text-[#F5F7FA] outline-none placeholder:text-[#98A2B3] focus-visible:ring-offset-0",
                  className
                )}
              />
            </div>
          </FormControl>
          <FormMessage className="text-[#D22627]" />
        </FormItem>
      )}
    />
  );
};
