import { useState } from "react";
import { useSearchStore } from "../../store";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ClothesFilters() {
  const { tmpFilters, setClothesFilter } = useSearchStore();
  const [collapsed, setCollapsed] = useState(true);

  const { clothesFilter } = tmpFilters;
  const toggleCollapsed = () => setCollapsed((prev) => !prev);

  return (
    <div>
      <div className="px-4 py-2 flex items-center gap-3">
        <Switch checked={clothesFilter} onCheckedChange={setClothesFilter} />
        <span className=" text-base font-semibold">Clothes</span>
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
        <div className="p-4  h-32 grid place-content-center">
          <span>clothes filters here</span>
        </div>
      </motion.div>
    </div>
  );
}
