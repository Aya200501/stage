import { Input } from "@/components/ui/input";
import { CameraType } from "@/utils";
import CameraIcon from "@/assets/icons/white-camera.svg?react";
import { Checkbox } from "@/components/ui/checkbox";
import { useSearchStore } from "../../store";

export function CamerasList({
  cameras,
  camerasLoading,
}: {
  cameras: CameraType[];
  camerasLoading: boolean;
}) {
  const { search, setSearch, ids, selectId, setIds, deselectId } =
    useSearchStore();

  const filteredCameras = cameras.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-64  space-y-6 p-4 gap-4">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className="bg-background/50"
      />
      <div className="flex flex-col gap-3">
        <div className="flex  gap-3 items-center">
          <Checkbox
            checked={ids.length === cameras.length}
            onCheckedChange={(checked) => {
              if (checked) setIds(cameras.map((c) => c.id));
              else setIds([]);
            }}
          />
          <span className="truncate font-semibold">All Cameras</span>
        </div>
        {filteredCameras.map((item) => (
          <div key={item.id} className="flex  gap-3 items-center">
            <Checkbox
              checked={ids.includes(item.id)}
              onCheckedChange={(checked) => {
                if (checked) selectId(item.id);
                else deselectId(item.id);
              }}
            />
            <CameraIcon className="size-5" />
            <span className="truncate font-semibold">{item.name}</span>
          </div>
        ))}
        {camerasLoading &&
          Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="h-6 w-full items-center bg-foreground/25 rounded animate-pulse"
            ></div>
          ))}
      </div>
    </div>
  );
}
