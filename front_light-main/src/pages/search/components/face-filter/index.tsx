import { useState } from "react";
import { useSearchStore } from "../../store";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export function FaceFilters() {
  const { tmpFilters, setFaceFilter } = useSearchStore();
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => setCollapsed((prev) => !prev);
  const { t } = useTranslation();

  const { faceFilter } = tmpFilters;

  return (
    <div>
      <div className="px-4 py-2 flex items-center gap-3">
        <Switch checked={faceFilter} onCheckedChange={setFaceFilter} />
        <span className=" text-base font-semibold capitalize">{t("face")}</span>
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
          <span>face filters here</span>
        </div>
      </motion.div>
    </div>
  );
}
