import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LayoutGrid, List, Plus } from "lucide-react";

export const Filter = ({ cameraId }: { cameraId?: string }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigate();
  const viewParam = searchParams.get("view") || "grid";
  return (
    <div className="flex w-full flex-wrap gap-2 [&>*]:order-2">
      <div className="flex items-center gap-2.5 md:ml-auto">
        <Button
          className={cn(
            "size-10 bg-[#202020] hover:bg-[#202020]/60 p-2 rounded-lg text-white hover:text-white/60 flex items-center justify-center ",
            viewParam === "list" && "border-2 border-[#D22627]"
          )}
          onClick={() => setSearchParams({ view: "list" })}
        >
          <List className="w-6 h-6" />
        </Button>
        <Button
          className={cn(
            "size-10 bg-[#202020] hover:bg-[#202020]/60 p-2 rounded-lg fill-white hover:fill-white/60 flex items-center justify-center text-white hover:text-white/60",
            viewParam === "grid" && "border-2 border-[#D22627]"
          )}
          onClick={() => setSearchParams({ view: "grid" })}
        >
          <LayoutGrid className="w-5 h-5 fill-inherit" />
        </Button>
      </div>
      <Button
        className="p-2 rounded-lg text-white hover:text-white/60 text-sm flex items-center gap-2.5"
        onClick={() => {
          navigation(`/workflows/workflow/${cameraId}`);
        }}
      >
        <Plus className="w-6 h-6" />
        <span>Add Flow</span>
      </Button>
    </div>
  );
};
