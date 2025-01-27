import { ColumnDef } from "@tanstack/react-table";

import { useTranslation } from "react-i18next";

const HeaderTranslation = (header: string) => {
  const { t } = useTranslation();
  return <>{t(header)}</>;
};

export const columns: ColumnDef<unknown>[] = [
  {
    accessorKey: "name",
    header: () => HeaderTranslation("Plugin Name"),
    maxSize: 150,
    cell: ({ row }) => {
      return (
        <div className="text-xs font-semibold xl:text-sm max-w-40 truncate">
          {row.getValue("name")}
        </div>
      );
    },
  },
  {
    accessorKey: "date_installation",
    header: () => HeaderTranslation("date installation"),
    size: 150,
    cell: ({ row }) => {
      return (
        <div className="text-xs font-semibold xl:text-sm">
          {row.getValue("date_installation")}
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    size: 150,
    cell: ({ row }) => {
      return (
        <div className="=text-nowrap text-sm font-semibold xl:text-sm">
          {row.getValue("type")}
        </div>
      );
    },
  },
  {
    accessorKey: "statut",
    header: () => HeaderTranslation("Statut"),
    size: 150,

    cell: ({ row }) => {
      return (
        <div className="=text-nowrap text-sm font-semibold xl:text-sm">
          {row.getValue("Statut")}
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: () => HeaderTranslation("Action"),
    size: 220,
    cell: ({ row }) => {
      return (
        <div className="=text-nowrap text-sm font-semibold xl:text-sm">
          {row.getValue("action")}
        </div>
      );
    },
  },
  {
    id: "more",
    enableHiding: true,
    size: 0,
    cell: ({ row }) => {
      return (
        <div className="=text-nowrap text-sm font-semibold xl:text-sm">
          {row.getValue("uninstall")}
        </div>
      );
    },
  },
];
