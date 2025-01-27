import { JsonValue, TableDisplayForma, stringify } from "@/utils";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Image } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Formatter = ({
  value,
  displayFormat,
}: {
  value: JsonValue;
  displayFormat: TableDisplayForma | undefined;
}) => {
  const { t } = useTranslation();
  if (displayFormat === "string" || displayFormat === "json") {
    return <>{stringify(value)}</>;
  }
  if (displayFormat === "color" && typeof value === "string") {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={150}>
          <TooltipTrigger>
            <div
              className="border border-foreground/20 rounded h-6 aspect-video shrink-0"
              style={{ backgroundColor: stringify(value) }}
            ></div>
          </TooltipTrigger>
          <TooltipContent>{t(value)}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  if (displayFormat === "integer") return <>{parseInt(stringify(value), 10)}</>;
  if (displayFormat === "float")
    return <>{parseFloat(stringify(value))?.toFixed(2)}</>;
  if (displayFormat === "boolean") return <>{value ? "true" : "false"}</>;
  if (displayFormat === "date")
    return <>{format(new Date(stringify(value)), "PP")}</>;
  if (displayFormat === "image")
    return (
      <Avatar className="h-full rounded-none">
        <AvatarImage className="object-contain" src={stringify(value)} />

        <AvatarFallback className="bg-foreground/5 px-3 [&>]:rounded font-bold">
          {stringify(value) ? "Failed to load image" : "No Image"}
        </AvatarFallback>
      </Avatar>
    );
  if (displayFormat === "imageDialog") {
    return (
      <Dialog>
        <DialogTrigger>
          <div className="cursor-pointer truncate flex gap-2 items-center px-2 py-1 rounded hover:bg-foreground/10">
            <Image size={20} />
            <span>Image</span>
          </div>
        </DialogTrigger>
        <DialogContent className="flex flex-col gap-4 max-w-fit min-w-96">
          <div className="flex items-center justify-center ">
            <img src={value as string} alt="Image" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  return <>{stringify(value)}</>;
};
