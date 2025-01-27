import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { CameraType } from "@/utils";

import { MapContainer, Marker, Polygon, TileLayer } from "react-leaflet";
import { Group, TPolygon } from "@/utils";
import MapControls from "@/components/map-controls";

import { Icon } from "leaflet";

import { concatGroups } from "@/utils/functions";
import { cn } from "@/lib/utils";

const CameraIcon = new Icon({
  iconUrl: "/icons/CameraMarker.svg",
  iconSize: [40, 40],
});

interface CameraLocationProps {
  camera: CameraType;
  triggerSize?: "small" | "large";
}

export const CameraLocation = ({
  camera,
  triggerSize = "small",
}: CameraLocationProps) => {
  const groups = concatGroups(
    camera?.group.type === "SITE" ? camera.group : camera?.group.parent,
    camera?.group.type === "AREA" ? camera.group : undefined
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "whitespace-nowrap  gap-3 bg-[#F5F7FA]/10 text-xs text-[#F5F7FA] hover:bg-[#F5F7FA]/5 hover:text-[#F5F7FA]/70",
            triggerSize === "large" &&
              "h-8 gap-2 text-nowrap rounded-sm border border-gray-500 font-bold hover:brightness-95 w-full bg-transparent hover:bg-transparent text-muted-foreground"
          )}
        >
          <MapPin className="size-4" />
          View location
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl gap-10 flex flex-col p-8">
        <DialogHeader>
          <DialogTitle>Camera Location</DialogTitle>
        </DialogHeader>
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border-2 border-dashed">
          <MapContainer
            attributionControl={false}
            center={[33, -7]}
            zoom={6}
            maxZoom={18}
            minZoom={4}
            style={{
              height: "100%",
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="http://{s}.google.com/vt/lyrs=m&gl=ma&x={x}&y={y}&z={z}"
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
            />
            {camera.latitude && camera.longitude && (
              <MapControls
                bounds={[
                  [camera.latitude, camera.longitude] as [number, number],
                  [camera.latitude, camera.longitude] as [number, number],
                ]}
              />
            )}
            {groups.map((group: Group) => {
              return (
                <Polygon
                  key={group.id}
                  positions={group.polygon as TPolygon}
                  fillColor={group.type === "AREA" ? "#EB459F" : "#5865F2"}
                  color={group.type === "AREA" ? "#EB459F" : "#5865F2"}
                />
              );
            })}
            {camera.latitude && camera.longitude && (
              <Marker
                position={[camera.latitude, camera.longitude]}
                icon={CameraIcon}
              />
            )}
          </MapContainer>
        </div>
      </DialogContent>
    </Dialog>
  );
};
