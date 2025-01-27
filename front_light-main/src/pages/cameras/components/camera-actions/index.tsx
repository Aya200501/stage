import { Eye, MoreVertical, Trash } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";

import { useGlobalContext } from "@/Context";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import { CameraInfo } from "../camera-info";
import { useConfirmDialog } from "@/components/confirm-dialog";
import { CameraType, getPermissionLevel } from "@/utils";
import { CameraLocation } from "../list-view/camera-location";
import { AddCameraModal } from "../AddCameraModal";
import { useTranslation } from "react-i18next";
import { useCameras } from "../../store";

interface CameraActionsProps {
  camera: CameraType;
  view?: "list" | "grid";
}

export const CameraActions = ({
  camera,
  view = "grid",
}: CameraActionsProps) => {
  const { t } = useTranslation();
  const { backendApi, user, groupId } = useGlobalContext();
  const { confirm } = useConfirmDialog();
  const [isPending, setIsPending] = useState(false);
  const { items, setItems } = useCameras();

  const permissionLevel = useMemo(
    () => getPermissionLevel(user, "CAMERA", groupId),
    [user, groupId]
  );

  const deleteCamera = async (id: string) => {
    confirm({
      confirmTitle: "Are you sure?",
      confirmMessage:
        "This action cannot be undone. Are you sure you want to proceed?",
      onConfirm: async () => {
        try {
          setIsPending(true);
          await backendApi.DeleteById("camera", id);
          setItems(items.filter((item) => item.id !== id));
          toast.success("Camera deleted successfully");
        } catch (error) {
          console.error("error", error);
        } finally {
          setIsPending(false);
        }
      },
    });
  };

  const CameraLocations = useMemo(() => {
    const group = camera.group;
    if (group) {
      if (camera.group.type === "AREA") {
        return {
          area: group.id,
          site: group?.parent?.id || "",
          city: group?.parent?.parent?.id || "",
          region: group?.parent?.parent?.parent?.id || "",
        };
      } else if (camera.group.type === "SITE") {
        return {
          area: "",
          site: group.id,
          city: group?.parent?.id || "",
          region: group?.parent?.parent?.id || "",
        };
      } else if (camera.group.type === "CITY") {
        return {
          area: "",
          site: "",
          city: group.id,
          region: group?.parent?.id || "",
        };
      } else if (camera.group.type === "REGION") {
        return {
          area: "",
          site: "",
          city: "",
          region: group.id,
        };
      }
    }
    return {
      area: "",
      site: "",
      city: "",
      region: "",
    };
  }, [camera]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-8 w-8 bg-transparent p-0 text-[#D2D4DA] transition-all duration-500 hover:bg-white/10">
          <MoreVertical className="size-5 stroke-2 text-gray-600 dark:text-gray-400" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="absolute -top-8 right-8 flex flex-col gap-2.5 rounded-lg border-[0.5px] border-[#ABBED1] bg-[#26323899] p-2 backdrop-blur-[12px] "
      >
        {view === "grid" && <CameraLocation camera={camera} />}
        <AddCameraModal
          triggerSize="small"
          type="edit"
          defaultValues={{
            cameraName: camera.name,
            cameraType: camera.type,
            description: camera.description || "",
            httpPort: camera.config?.httpPort?.toString() || "",
            rtspPort: camera.port?.toString() || "",
            rtspLink: camera?.config?.rtspLink || "",
            rtspLinkLocal: camera?.config?.rtspLinkLocal || "",
            username: camera.username || "",
            password: camera.password || "",
            onvifPort: camera.config?.onvifPort?.toString() || "",
            model: camera.model,
            ipAddress: camera.ipAdress || "",
            position: {
              lat: camera.latitude,
              lng: camera.longitude,
            },
            mark: camera.brand,
            city: CameraLocations.city,
            region: CameraLocations.region,
            site: CameraLocations.site,
            area: CameraLocations.area,
          }}
          disabled={isPending || permissionLevel < 3}
          cameraId={camera.id}
        />
        <Link
          to={`/cameras/${camera.id}`}
          className="h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium gap-3 bg-[#F5F7FA]/10 text-xs text-[#F5F7FA] hover:bg-[#F5F7FA]/5 hover:text-[#F5F7FA]/70"
        >
          <Eye className="size-5" />
          <span>{t("view Live Camera")}</span>
        </Link>
        <CameraInfo cameraId={camera.id} />
        <div className="w-full border border-[#89939E]" />
        <Button
          className="gap-3  bg-[#FF3D00]/10 text-xs text-[#FF3D00] hover:bg-[#FF3D00]/5 hover:text-[#FF3D00]/70"
          onClick={() => {
            deleteCamera(camera.id);
          }}
          disabled={isPending || permissionLevel < 3}
        >
          <Trash className="size-4" />
          <span className="first-letter:uppercase">{t("deleteCamera")}</span>
        </Button>
      </PopoverContent>
    </Popover>
  );
};
