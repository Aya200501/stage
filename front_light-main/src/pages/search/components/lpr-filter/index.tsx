import { useState } from "react";
import { useSearchStore } from "../../store";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, EraserIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import DebouncedInput from "@/components/debounced-input";

export function LprFilters() {
  const { tmpFilters, setLprFilter, setLpr } = useSearchStore();
  const [collapsed, setCollapsed] = useState(true);
  const { lprFilter, lpr } = tmpFilters;
  const toggleCollapsed = () => setCollapsed((prev) => !prev);

  return (
    <div>
      <div className="px-4 py-2 flex items-center gap-3">
        <Switch checked={lprFilter} onCheckedChange={setLprFilter} />
        <span className=" text-base font-semibold">LPR</span>
        <Button
          variant="ghost"
          size={"icon"}
          className=" ml-auto"
          onClick={toggleCollapsed}
        >
          <ChevronDownIcon
            className={cn(" transition-transform duration-500", {
              "rotate-180": !collapsed,
            })}
            size={24}
          />
        </Button>
      </div>
      <motion.div
        className="overflow-hidden"
        initial={false}
        animate={{
          height: collapsed ? 0 : "auto",
        }}
      >
        <div className="p-4">
          <div className="mt-4 flex justify-between items-center">
            <Label className="text-foreground/50  capitalize">plate</Label>
            <Button
              variant="outline"
              size="icon"
              className="h-7 text-foreground/50"
              onClick={() => setLpr({ plate: undefined })}
            >
              <EraserIcon size={18} />
            </Button>
          </div>
          <DebouncedInput
            className="mt-2 !appearance-none"
            id="plate"
            value={lpr.plate || ""}
            onValueChange={(value) => {
              setLpr({ plate: value });
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
