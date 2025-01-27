/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useGlobalContext } from "@/Context";
import { env } from "@/lib/env";
import { cn } from "@/lib/utils";
import { ColumnDef, Row } from "@tanstack/react-table";
import { InfoIcon, XIcon } from "lucide-react";
import {
  JsonView,
  allExpanded,
  darkStyles,
  defaultStyles,
} from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

export type LogsType = {
  id: string;
  user: {
    id: string;
    fullName: string;
    image: string;
    isSuperAdmin: boolean;
    roles: any[];
  };
  action: string;
  model: string;
  createdAt: Date;
  ipAdress: string;
  data: TData;
};

const InfoCell = ({ row }: { row: Row<LogsType> }) => {
  const { oldData, newData } = (row.original as any).data as TData;
  const { model } = row.original;
  const { theme } = useGlobalContext();

  return (
    <>
      {model !== "AUTH" && (
        <Dialog>
          <DialogTrigger asChild>
            <Button size={"icon"} variant={"ghost"}>
              <InfoIcon size={20} />
            </Button>
          </DialogTrigger>
          <DialogContent
            hideCloseButton
            className="w-fit max-w-none [&>*]:w-[min(90vh,40rem)]  "
          >
            <DialogHeader>
              <h2 className="font-semibold text-lg flex items-center justify-between">
                <span>Data Changes</span>
                <DialogClose asChild>
                  <Button size={"icon"} variant={"ghost"}>
                    <XIcon size={20} />
                  </Button>
                </DialogClose>
              </h2>
            </DialogHeader>
            <DialogDescription>
              <p className="text-muted-foreground">
                The changes made to the data are shown below.
              </p>
            </DialogDescription>
            {oldData && Object.keys(oldData).length ? (
              <div className=" relative ">
                <h3 className="font-semibold text-lg mb-2">Old Data</h3>
                <JsonView
                  data={oldData}
                  shouldExpandNode={allExpanded}
                  style={theme === "dark" ? darkStyles : defaultStyles}
                />
              </div>
            ) : null}
            {newData && Object.keys(newData).length ? (
              <div className=" relative ">
                <h3 className="font-semibold text-lg mb-2">New Data</h3>
                <JsonView
                  data={newData}
                  shouldExpandNode={allExpanded}
                  style={theme === "dark" ? darkStyles : defaultStyles}
                />
              </div>
            ) : null}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export const LogsColumns: ColumnDef<LogsType>[] = [
  {
    accessorKey: "user",
    header: "User",
    size: 150,
    cell: ({ row }) => {
      const user: any = row.getValue("user");
      const { groupId } = useGlobalContext();

      const userRole = user.roles.find((role: any) => role.groupId === groupId);
      return (
        <div className="flex items-center gap-2">
          <div className="size-12 relative rounded-full overflow-hidden">
            <img
              src={`${env.VITE_BACKEND_API}/uploads/${user.image}`}
              alt={user.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/placeholder.jpg";
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold capitalize">{user.fullName}</h3>
            {user.isSuperAdmin ? (
              <div className="px-2.5 py-1 bg-foreground/5 rounded flex items-center gap-2">
                <span
                  className="size-2.5 rounded-[0.125rem]"
                  style={{ backgroundColor: "#FFC107" }}
                />
                <span className="font-medium text-sm">SuperAdmin</span>
              </div>
            ) : (
              userRole && (
                <div className="px-2.5 py-1 bg-foreground/5 rounded flex items-center gap-2">
                  <span
                    className="size-2.5 rounded-[0.125rem]"
                    style={{
                      backgroundColor: user.isSuperAdmin
                        ? "#FFC107"
                        : userRole.role?.color ?? "#FFC107",
                    }}
                  />
                  <span className="font-medium text-sm">
                    {userRole.role.name}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "ipAdress",
    header: "IP Address",
    size: 180,
    cell: ({ row }) => {
      const ip: any = row.getValue("ipAdress");
      return <div className="flex flex-col gap-1 text-nowrap">{ip}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date & Time",
    size: 180,
    cell: ({ row }) => {
      const date: any = `${new Date(
        row.getValue("createdAt")
      ).toDateString()} - ${new Date(
        row.getValue("createdAt")
      ).toTimeString()}`;
      return <div className="flex flex-col gap-1 text-nowrap">{date}</div>;
    },
  },
  {
    accessorKey: "function",
    header: "Function",

    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-1 text-nowrap ">
          {row.getValue("function")}
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Status",
    cell: ({ row }) => {
      const { action, model } = row.original;

      return (
        <span
          className={cn(
            " h-9 py-2.5 px-3 font-medium flex items-center capitalize gap-2 w-fit rounded text-nowrap ",
            (action === "create" || action === "SIGN IN") && "bg-[#2E7D3233] ",
            (action === "update" || action === "signout") && "bg-[#FFC10733]",
            action === "remove" && "bg-[#D2262733]"
          )}
        >
          {model === "AUTH" ? action : `${action} ${model.toLowerCase()}`}
        </span>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-1 text-nowrap ">
          {row.getValue("description")}
        </div>
      );
    },
  },
  {
    id: "more",
    header: "",
    size: 0,
    cell: InfoCell,
  },
];

type TData = {
  newData: Record<string, any>;
  oldData: Record<string, any>;
};
