import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { AlertType } from "@/utils/api-types";
import { ChangeAlertStatusButton } from "../change-alert-status-button";
import { formatDate } from "@/utils/functions";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreVertical, Trash } from "lucide-react";
import { AlertDetailsTrigger } from "../../alert-details/components/trigger";

export const HistoricalAlertColumns: ColumnDef<AlertType>[] = [
  {
    accessorKey: "updatedAt",
    header: "Date and Time",
    size: 220,
    cell: ({ row }) => {
      const date = formatDate(new Date(row.getValue("updatedAt")));

      return (
        <div className="min-w-fit text-nowrap text-sm font-semibold  2xl:text-base">
          {date}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 220,
    cell: ({ row }) => {
      return (
        <div className="min-w-fit text-nowrap text-sm font-semibold 2xl:text-base capitalize">
          {row.getValue("name")}
        </div>
      );
    },
  },
  {
    accessorKey: "message",
    header: "Message",
    size: 220,
    cell: ({ row }) => {
      return (
        <div className="min-w-fit text-nowrap text-sm font-semibold 2xl:text-base capitalize">
          {row.getValue("message")}
        </div>
      );
    },
  },
  {
    accessorKey: "level",
    header: "Alert Level",
    size: 220,
    cell: ({ row }) => {
      const level: string = row.getValue("level");

      return (
        <div
          className={cn(
            "flex w-fit items-center text-nowrap text-left text-sm font-semibold text-white 2xl:text-base capitalize px-6 py-2 rounded-md",
            level === "INFO" && "text-[#4CAF50] bg-[#4CAF50]/10",
            level === "WARNING" && "text-yellow-400 bg-[#FFC10733]",
            level === "CRITICAL" && "text-[#FF3D00] bg-[#FF3D00]/10"
          )}
        >
          {level.toLowerCase()}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    size: 220,
    cell: ({ row }) => {
      const alert = row.original;
      const status = alert.status;
      return (
        <div className="flex items-center text-sm font-medium text-white/60">
          {status === "ACTIVE" || status === "PENDING" ? (
            <div className="flex items-center gap-4 font-semibold text-white [&>*]:h-8 [&>*]:w-32 [&>*]:rounded-sm">
              <ChangeAlertStatusButton
                label="Acknowledge"
                alertId={alert.id}
                newStatus="RESOLVED"
              />
              <ChangeAlertStatusButton
                label="Reject"
                alertId={alert.id}
                newStatus="DISMISSED"
              />
            </div>
          ) : (
            <div className="flex items-center gap-4 font-semibold text-white/80 [&>*]:h-8 [&>*]:w-32 [&>*]:rounded-sm capitalize ">
              {status.toLowerCase()} at {formatDate(new Date(alert.updatedAt))}
            </div>
          )}
        </div>
      );
    },
  },
  {
    id: "more",
    enableHiding: true,
    size: 0,
    cell: ({ row }) => {
      const alert = row.original;
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button className="size-8 bg-transparent p-0 text-sm text-[#D2D4DA] transition-all duration-500 hover:bg-white/10 ">
              <MoreVertical className="size-5 stroke-2" />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            align="end"
            className="absolute -top-8 right-8 flex flex-col gap-2.5 rounded-lg border-[0.5px] border-[#ABBED1] bg-[#26323899] p-2 backdrop-blur-[12px]"
          >
            <AlertDetailsTrigger alert={alert} />
            <div className="w-full border border-[#89939E]" />
            <Button
              className="gap-3  bg-[#FF3D00]/10 text-sm text-[#FF3D00] hover:bg-[#FF3D00]/5 hover:text-[#FF3D00]/70"
              disabled
            >
              <Trash className="size-4" />
              Supprimer
            </Button>
          </PopoverContent>
        </Popover>
      );
    },
  },
];
