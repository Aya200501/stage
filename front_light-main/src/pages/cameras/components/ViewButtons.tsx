import { cn } from "@/lib/utils";
import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";

export const ViewButtons = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const viewParam = searchParams.get("view") || "grid";

  return (
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
  );
};
