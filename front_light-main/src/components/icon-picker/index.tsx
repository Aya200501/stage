/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDebounce } from "@/components/MultipleSelector";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { memo, useMemo, useRef } from "react";
import lucide from "./lucide";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icon } from "../icon";
import { twMerge } from "tailwind-merge";
import { VirtualizedGrid } from "../virtualized-grid";
import { useTranslation } from "react-i18next";

//---------------------------------
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CameraIcon, PlusCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useGlobalContext } from "@/Context";
import { toast } from "sonner";
import useSWR, { useSWRConfig } from "swr";
import { env } from "@/lib/env";
import Loader from "@/pages/dashboard/components/loader";

//---------------------------------

const icons = Object.keys(lucide).filter(
  (key) => !key.startsWith("Lucide") && !key.endsWith("Icon")
);

const IconsList = ({
  selectedIcon,
  search,
  onSelect,
}: {
  selectedIcon?: string | null;
  search: string;
  onSelect: (icon: string) => void;
}) => {
  const filteredIcons = useMemo(() => {
    return icons
      .filter((icon) => icon.toLowerCase().includes(search.toLowerCase()))
      .splice(0, 1500);
  }, [search]);

  return (
    <VirtualizedGrid
      containerHeight={204}
      items={filteredIcons}
      itemHeight={54}
      cols={7}
      style={{ height: 204 }}
    >
      {({ item, index, style }) => {
        return (
          <div style={style}>
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() => {
                      onSelect(item);
                    }}
                    data-selected={selectedIcon === item}
                    className="data-[selected=true]:border-primary"
                  >
                    <Icon name={item} size={20} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{item}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      }}
    </VirtualizedGrid>
  );
};

const MemorizedList = memo(IconsList);

// -----------------------------------
const CustomIconsList = ({
  selectedIcon,
  search,
  onSelect,
}: {
  selectedIcon?: string | null;
  search: string;
  onSelect: (icon: string) => void;
}) => {
  const { backendApi, currentGroup } = useGlobalContext();

  const { data, isLoading } = useSWR("icons", async () => {
    const res = await backendApi.findMany("icon", {
      where: {
        groupId: currentGroup?.id,
      },
    });
    return res;
  });

  return isLoading ? (
    <Loader />
  ) : (
    <div className="grid grid-cols-4 gap-2  max-h-[200px] overflow-auto p-2">
      {data?.results
        .filter((icon: any) =>
          icon.name.toLowerCase().includes(search.toLowerCase())
        )
        .splice(0, 1500)
        .map((icon: any) => env.VITE_BACKEND_API + "/" + icon.url)
        .map((item: any, index: any) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    onSelect(item);
                  }}
                  data-selected={selectedIcon === item}
                  className="data-[selected=true]:border-primary w-full h-20 p-0 overflow-hidden"
                >
                  <img src={item} className="w-full h-full " />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{item}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
    </div>
  );
};

const MemorizedCustomList = memo(CustomIconsList);

// -----------------------------------

interface IconPickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  onSelect?: (icon: string) => void;
}

export const IconPicker = ({
  onSelect,
  className,
  ...props
}: IconPickerProps) => {
  const { t } = useTranslation();
  const { backendApi, currentGroup } = useGlobalContext();
  const [search, setSearch] = React.useState("");
  const [selectedIcon, setSelectedIcon] = React.useState<string | null>(null);
  const debouncedSearch = useDebounce(search, 500);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // -----------------------------------
  const [open, setOpen] = React.useState(false);
  const { mutate } = useSWRConfig();
  const uploadRef = useRef<HTMLInputElement | null>(null);

  const [icon, setIcon] = React.useState<{
    name: string;
    file: File;
  }>({
    name: "",
    file: new File([], ""),
  });

  const [preview, setPreview] = React.useState<string | null>(null);

  const handleUpload = async () => {
    if (!icon.file || !icon.name) {
      toast.error("Please select an icon and give it a name");
      return;
    }

    const formData = new FormData();
    formData.append("name", icon.name);
    formData.append("groupId", currentGroup?.id || "");
    formData.append("icon", icon.file);

    await backendApi.create("icon", formData);

    mutate("icons");

    setOpen(false);
  };

  // -----------------------------------

  return (
    <div className={twMerge("flex flex-col gap-4", className)} {...props}>
      <Input
        value={search}
        onChange={handleChange}
        placeholder={t("iconSearch")}
      />
      {/* ----------------------------------- */}

      <Accordion type="single" defaultValue="global-icons">
        <AccordionItem value="global-icons">
          <AccordionTrigger>Global Icons</AccordionTrigger>
          <AccordionContent>
            <MemorizedList
              selectedIcon={selectedIcon}
              search={debouncedSearch}
              onSelect={(icon) => {
                setSelectedIcon(icon);
                onSelect?.(icon);
              }}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="custom-icons" className="relative">
          <AccordionTrigger>Custom Icons</AccordionTrigger>
          <AccordionContent>
            <MemorizedCustomList
              selectedIcon={selectedIcon}
              search={debouncedSearch}
              onSelect={(icon) => {
                setSelectedIcon(icon);
                onSelect?.(icon);
              }}
            />

            <Popover open={open}>
              <PopoverTrigger
                className="absolute top-4 right-4 flex place-self-end w-fit  rounded-full font-bold mb-2 cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <PlusCircle size={25} color="green" />
              </PopoverTrigger>
              <PopoverContent className="!z-[1000] bg-card">
                <div className="flex flex-col items-center gap-3 mb-3">
                  <div
                    className="flex justify-center items-center mt-5 w-[100px] h-[100px] rounded border border-white cursor-pointer"
                    onClick={() => {
                      uploadRef.current?.click();
                    }}
                  >
                    {preview ? (
                      <img
                        src={preview}
                        alt={icon.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <CameraIcon size={50} />
                    )}
                  </div>
                  <Input
                    value={icon.name}
                    onChange={(e) => {
                      setIcon({
                        name: e.target.value,
                        file: icon.file,
                      });
                    }}
                    placeholder={"Icon Name"}
                  />
                  <input
                    ref={uploadRef}
                    type="file"
                    className="hidden"
                    accept="image/svg+xml"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setPreview(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                        setIcon({
                          name: icon.name || file.name,
                          file,
                        });
                      }
                      e.target.value = "";
                    }}
                  />
                </div>
                <Button className="flex place-self-end" onClick={handleUpload}>
                  Upload
                </Button>
              </PopoverContent>
            </Popover>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* ----------------------------------- */}
    </div>
  );
};
