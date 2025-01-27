import { Card } from "@/components/ui/card";
import { useGlobalContext } from "@/Context";
import { CameraType } from "@/utils";
import useSWR from "swr";
import { useSearchStore } from "./store";
import { Results } from "./components/results";
import { Filters } from "./components/filters";
import { CamerasList } from "./components/cameras-list";

export default function SearchPage() {
  const { backendApi, groupId } = useGlobalContext();
  const { setIds, setCameras } = useSearchStore();

  const key = `cameras-${groupId}`;
  const {
    data: cameras = [],
    isLoading: camerasLoading,
    error,
  } = useSWR(key, async () => {
    const result = await backendApi.findMany<CameraType>("camera", {
      where: {
        OR: [
          { group: { id: groupId } },
          { group: { parent: { id: groupId } } },
          { group: { parent: { parent: { id: groupId } } } },
          { group: { parent: { parent: { parent: { id: groupId } } } } },
        ],
      },
      select: {
        id: true,
        name: true,
        group: { select: { name: true } },
        telemetries: { select: { name: true } },
      },
      pagination: { perPage: 10_000, page: 1 },
    });
    setIds(result.results.map((c) => c.id));
    setCameras(result.results);
    return result.results;
  });

  if (error)
    return (
      <div className="grid place-content-center min-h-full">
        <span className="text-3xl text-foreground/50">
          Error fetching cameras
        </span>
      </div>
    );
  return (
    <div className="h-full overflow-auto grid  lg:grid-cols-[min-content,1fr] flex-1 gap-4 text-xs flex-col ">
      <Card className="flex h-full overflow-auto min-h-[30rem] max-lg:flex-wrap">
        <CamerasList cameras={cameras} camerasLoading={camerasLoading} />
        <Filters />
      </Card>
      <Results />
    </div>
  );
}
