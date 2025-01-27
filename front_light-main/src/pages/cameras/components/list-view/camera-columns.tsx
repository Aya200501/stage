import { ColumnDef } from "@tanstack/react-table";

import { CameraType } from "@/utils/api-types";
import { CameraActions } from "../camera-actions";
import { CameraConfigModal } from "../CameraConfigModal";

import { CameraLocation } from "./camera-location";
import { useTranslation } from "react-i18next";

const HeaderTranslation = (header: string) => {
  const { t } = useTranslation();
  return <>{t(header)}</>;
};

export const columns: ColumnDef<CameraType>[] = [
  {
    accessorKey: "name",
    header: () => HeaderTranslation("name"),
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
    accessorKey: "model",
    header: () => HeaderTranslation("Référence"),
    size: 150,
    cell: ({ row }) => {
      return (
        <div className="text-xs font-semibold xl:text-sm">
          {row.getValue("model")}
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
  //TODO: check if status exists in the API
  {
    accessorKey: "Statut",
    header: () => HeaderTranslation("Statut"),
    size: 150,

    cell: ({ row }) => {
      return (
        <div className="=text-nowrap text-sm font-semibold xl:text-sm">
          {row.getValue("statut")}
        </div>
      );
    },
  },
  //TODO: check if plugins exists in the API
  {
    accessorKey: "Plugins",
    header: () => HeaderTranslation("Plugins"),
    size: 220,
    cell: ({ row }) => {
      const camera = row.original;
      return <CameraLocation camera={camera} triggerSize="large" />;
    },
  },
  {
    accessorKey: "Workflow",
    header: "Workflow",
    size: 220,
    cell: ({ row }) => {
      const cameraId = row.original.id;
      return (
        <CameraConfigModal
          key={cameraId}
          cameraId={cameraId}
          triggerSize="large"
        />
      );
    },
  },
  {
    accessorKey: "Configuration",
    header: "Configuration",
    size: 220,
    cell: ({ row }) => {
      const cameraId = row.original.id;
      return (
        <CameraConfigModal
          key={cameraId}
          cameraId={cameraId}
          triggerSize="large"
        />
      );
    },
  },
  {
    id: "more",
    enableHiding: true,
    size: 0,
    cell: ({ row }) => {
      const camera = row.original;

      return <CameraActions camera={camera} view="list" />;
    },
  },
];
