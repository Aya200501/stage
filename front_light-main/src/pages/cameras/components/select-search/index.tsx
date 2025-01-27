/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormField, FormItem, FormMessage } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

interface SelectSearchProps {
  name: string;
  control: any;
  disabled?: boolean;
  data: any[];
  label: string;
  placeholder: string;
  onSelect?: (value: string) => void;
}

export const SelectSearch = ({
  name,
  control,
  disabled = false,
  data,
  label,
  placeholder,
  onSelect,
}: SelectSearchProps) => {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="text-base text-[#F5F7FA]">{label}</div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                disabled={disabled}
                variant="ghost"
                className="flex w-full items-center justify-between border-0 bg-[#383838] text-[#F5F7FA] outline-none placeholder:text-[#98A2B3] focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                <span>{field.value || placeholder}</span>
                <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-96 z-[509]" align="start">
              <Command>
                <CommandInput placeholder="Select a model" />
                <CommandList className="z-[509]">
                  <CommandEmpty>No Model found</CommandEmpty>
                  {name === "mark" ? (
                    <CommandGroup>
                      {data?.map((item) => (
                        <CommandItem
                          onSelect={() => {
                            field.onChange(item.mark);
                            setOpen(false);
                            onSelect && onSelect(item.mark);
                          }}
                          key={item.mark}
                          className="capitalize"
                        >
                          {item.mark}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  ) : (
                    <CommandGroup>
                      {data?.map((item: string) => (
                        <CommandItem
                          onSelect={() => {
                            field.onChange(item);
                            setOpen(false);
                          }}
                          key={item}
                        >
                          {item}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage className="text-[#D22627]" />
        </FormItem>
      )}
    />
  );
};
