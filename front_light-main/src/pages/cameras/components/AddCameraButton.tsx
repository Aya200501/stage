import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

interface AddCameraButtonProps {
  size?: "small" | "large";
  onClick: () => void;
}

export const AddCameraButton = ({
  size = "small",
  onClick,
}: AddCameraButtonProps) => {
  return (
    <Button
      className={cn(
        "flex items-center justify-center gap-2.5 rounded-lg bg-transparent text-lg font-semibold hover:bg-[#2196F3]/5",
        size === "large" &&
          "h-[15.25rem] flex-col gap-4 border-2 border-dashed border-[#2196F3] text-[#2196F3] text-base",
        size === "small" &&
          "!order-1 h-10 gap-1.5 bg-[#D22627] px-3.5 py-0 text-xs text-white hover:bg-[#D22627]/70 sm:!order-2"
      )}
      onClick={onClick}
    >
      <span
        className={cn(
          "flex items-center justify-center rounded-full",
          size === "large" && "size-20 bg-[#2196F31A]"
        )}
      >
        <Plus className={cn("size-5", size === "large" && "size-10")} />
      </span>
      Add Camera
    </Button>
  );
};
