/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FeatureGroup,
  MapContainer,
  Marker,
  Polygon,
  TileLayer,
} from "react-leaflet";
import { TPolygon } from "@/utils";
import MapControls from "@/components/map-controls";
import { useState } from "react";
import { EditControl } from "react-leaflet-draw";
import { Icon } from "leaflet";
import { Button } from "@/components/ui/button";
import { EraserIcon } from "lucide-react";

import { isMarkerInsidePolygon } from "@/utils/functions";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useCameraLocationStore } from "./camera-locations/store";
import { GroupNodeTree } from "@/utils/group-node-tree";

const CameraIcon = new Icon({
  iconUrl: "/icons/CameraMarker.svg",
  iconSize: [30, 30],
});

const concatGroups = (
  site: GroupNodeTree | null,
  area: GroupNodeTree | null
) => {
  if (site && area) {
    return [site, area];
  }
  if (site) {
    return [site];
  }
  return [];
};

interface CameraPositionPickerProps {
  control: any;
  watch: any;
}

export const CameraPositionPicker = ({
  control,
  watch,
}: CameraPositionPickerProps) => {
  const { t } = useTranslation();
  const position = watch("position");
  const selectedLocations = useCameraLocationStore(
    (state) => state.selectedLocations
  );
  const selectedSite = selectedLocations.SITE;
  const selectedArea = selectedLocations.AREA;
  const [marker, setMarker] = useState(
    position.lat && position.lng ? [position.lat, position.lng] : []
  );

  const groups = concatGroups(selectedSite, selectedArea);

  const bounds = groups.reduce((acc, val) => {
    const polygon = val.polygon?.map((item) => [item.lat, item.lng]) as
      | [number, number][]
      | [];
    return acc.concat(polygon);
  }, [] as [number, number][]);

  const handleCreateMarker = (e: any, field: any) => {
    if (selectedSite && selectedSite.polygon) {
      const polygon: [number, number][] = selectedSite.polygon.map((p) => [
        p.lat,
        p.lng,
      ]);

      if (
        !isMarkerInsidePolygon(
          [e.layer._latlng.lat, e.layer._latlng.lng],
          polygon
        )
      ) {
        toast.error(t("selectCameraError"));
        return e.layer.remove();
      }

      field.onChange({
        lat: e.layer._latlng.lat,
        lng: e.layer._latlng.lng,
      });
      setMarker([e.layer._latlng.lat, e.layer._latlng.lng]);
    }
  };

  return (
    <FormField
      control={control}
      name="position"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between items-center">
                <div className="text-base text-[#F5F7FA]">
                  Camera position
                  <span className="text-red-500">*</span>
                </div>
                <Button
                  disabled={marker.length === 0}
                  variant="outline"
                  size={"icon"}
                  className="size-8"
                  onClick={() => {
                    setMarker([]);
                    field.onChange({ lat: null, lng: null });
                  }}
                >
                  <EraserIcon size={16} />
                </Button>
              </div>
              <div className="mt-2 relative aspect-video w-full overflow-hidden rounded-lg border-2 border-dashed">
                {selectedSite ? (
                  <MapContainer
                    attributionControl={false}
                    center={[33, -7]}
                    zoom={6}
                    maxZoom={17}
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
                    <MapControls bounds={bounds} />
                    {selectedSite && selectedSite.polygon && (
                      <>
                        {groups.map((group: GroupNodeTree) => {
                          return (
                            <Polygon
                              key={group.id}
                              positions={group.polygon as TPolygon}
                              fillColor={
                                group.type === "AREA" ? "#EB459F" : "#5865F2"
                              }
                              color={
                                group.type === "AREA" ? "#EB459F" : "#5865F2"
                              }
                            />
                          );
                        })}
                        {marker.length === 0 ? (
                          <FeatureGroup>
                            <EditControl
                              edit={{
                                remove: false,
                                edit: false,
                              }}
                              position="topright"
                              onCreated={(e: any) =>
                                handleCreateMarker(e, field)
                              }
                              draw={{
                                polygon: false,
                                rectangle: false,
                                circle: false,
                                circlemarker: false,
                                marker:
                                  marker.length === 0
                                    ? { icon: CameraIcon }
                                    : false,
                                polyline: false,
                              }}
                            />
                          </FeatureGroup>
                        ) : (
                          <Marker
                            position={marker as [number, number]}
                            icon={CameraIcon}
                          />
                        )}
                      </>
                    )}
                  </MapContainer>
                ) : (
                  <div className="flex items-center justify-center text-center h-full w-full bg-[#383838] text-[#F5F7FA] text-[clamp(1rem,2vw,1.5rem)] leading-8 px-10">
                    {t("Select a site or area to pick the camera position")}
                  </div>
                )}
              </div>
            </div>
          </FormControl>
          <FormMessage className="text-[#D22627]" />
        </FormItem>
      )}
    />
  );
};
