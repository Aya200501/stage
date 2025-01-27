import { Filter } from "./components/Filter";
// import { ScrollArea } from "@/components/ui/scroll-area";

import { useGlobalContext } from "@/Context";
import { CameraType } from "@/utils";
// import { Camera } from "./components/Camera";
// import { AddCameraModal } from "./components/AddCameraModal";
import { useSearchParams } from "react-router-dom";
import Loader from "../dashboard/components/loader";
import { Unauthorized } from "@/components/403";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useCameras } from "./store";
import { DataTable } from "@/components/data-table";
import { columns } from "./components/list-view/camera-columns";
import { BallLoader } from "@/components/ball-loader";
// import { Skeleton } from "@/components/ui/skeleton";

const PER_PAGE = 40;

export default function CamerasPage() {
  const { backendApi, currentGroup, user } = useGlobalContext();
  const [searchParams] = useSearchParams();
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const page = useRef(1);
  const { items, setItems } = useCameras();
  const search = searchParams.get("search") ?? "";

  const ability =
    currentGroup?.getAbilityWithModel("USER", user?.isSuperAdmin) ?? 0;
  const groupIds = currentGroup?.getAllGroupIds() ?? [];
  const viewParam = searchParams.get("view") || "grid";

  const fetcher = async () => {
    setIsLoading(true);
    const { results } = await backendApi.findMany<CameraType>("camera", {
      pagination: {
        page: page.current,
        perPage: PER_PAGE,
      },
      where: {
        group: {
          id: {
            in: groupIds,
          },
        },
      },
      include: {
        group: {
          include: {
            parent: {
              include: {
                parent: {
                  include: {
                    parent: true,
                  },
                },
              },
            },
          },
        },
        cameraAnalyses: {
          select: {
            id: true,
            name: true,
            analyses: {
              select: {
                id: true,
                name: true,
                icon: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (results.length < PER_PAGE) {
      setIsLastPage(true);
    }
    return results;
  };

  const handleSearch = async () => {
    page.current = 1;
    const results = await fetcher();
    setItems([...results]);
    setIsLoading(false);
    page.current++;
  };

  const loadMore = async () => {
    const results = await fetcher();
    const noDuplicates = results.filter(
      (role) => !items.find((item) => item.id === role.id)
    );
    setTimeout(() => {
      setItems([...items, ...noDuplicates]);
      page.current++;
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (currentGroup) {
      page.current = 1;
      setItems([]);
      setIsLastPage(false);
      handleSearch();
    }
  }, [currentGroup, search]);

  // // Infinite scroll logic
  useEffect(() => {
    if (isLastPage || isLoading || !inView || !currentGroup) return;
    loadMore();
  }, [inView, isLastPage, isLoading, currentGroup]);

  if (ability === 0 && currentGroup) {
    return <Unauthorized />;
  }

  // const cameras = data ?? [];

  return currentGroup !== undefined ? (
    <div className="w-full h-fit min-h-full flex items-center justify-center">
      <Loader />
    </div>
  ) : (
    <main className="flex h-full w-full flex-col gap-3 max-md:px-4 max-md:pb-4 md:gap-4">
      <Filter permissionLevel={ability} />
      {/* <ScrollArea
        orientation="both"
        scrollareathumbclassName="bg-[#777986]"
        scrollbarclassName={
          viewParam === "grid"
            ? "mt-5 rounded-full"
            : "mt-16 bg-[#2C2C2C] rounded-full"
        }
        className={`
          flex-1 rounded-lg bg-card text-card-foreground shadow p-3.5
          ${viewParam === "list" ? "pt-1.5" : ""} 
        `}
      > */}
      {/* {viewParam === "grid" ? (
          <div className="w-full gap-3.5 grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]">
            {items.map((camera: CameraType) => (
              <Camera key={camera.id} data={camera} />
            ))}
            {isLoading &&
              items.length >= PER_PAGE &&
              items.length !== 0 &&
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-full min-h-[18.7rem] bg-muted dark:brightness-200 "
                />
              ))}

            <AddCameraModal triggerSize="large" disabled={ability < 2} />
          </div>
        ) : ( */}
      <DataTable
        columns={columns}
        data={items}
        tableCellClassName="px-3.5 py-1"
        tableHeadClassName="dark:bg-[#1D1F24]"
      />
      {/* )} */}
      {!isLoading && items.length === 0 ? null : (
        <div ref={ref} className="w-full min-h-4 h-4 relative">
          {isLoading && items.length >= PER_PAGE && viewParam === "list" && (
            <BallLoader />
          )}
        </div>
      )}
      {/* </ScrollArea> */}
    </main>
  );
}
