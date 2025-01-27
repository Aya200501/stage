import { useState } from "react";
import { useSearchStore } from "../../store";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, EraserIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import BicycleIcon from "@/assets/icons/bicycle.svg?react";
import CarIcon from "@/assets/icons/car.svg?react";
import MotorcycleIcon from "@/assets/icons/motorcycle.svg?react";
import BusIcon from "@/assets/icons/bus.svg?react";
import TruckIcon from "@/assets/icons/truck.svg?react";
import { Label } from "@/components/ui/label";
import { vehicleBrands, vehicleColors, vehicleTypes } from "@/utils";
import DebouncedInput from "@/components/debounced-input";
import { useTranslation } from "react-i18next";

const vehicleIcons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  bicycle: BicycleIcon,
  car: CarIcon,
  motorcycle: MotorcycleIcon,
  bus: BusIcon,
  truck: TruckIcon,
};

const colorsMap: Record<string, string> = {
  black: "#000000",
  blue: "#0000FF",
  brown: "#A52A2A",
  gray: "#808080",
  green: "#008000",
  orange: "#FFA500",
  purple: "#800080",
  red: "#FF0000",
  silver: "#C0C0C0",
  tan: "#D2B48C",
  white: "#FFFFFF",
  yellow: "#FFFF00",
};

export function VehicleFilters() {
  const { tmpFilters, setVehicleFilter, setVehicle } = useSearchStore();
  const { vehicleFilter, vehicle } = tmpFilters;
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => setCollapsed((prev) => !prev);

  const { t } = useTranslation();

  return (
    <div>
      <div className="px-4 py-2 flex items-center gap-3">
        <Switch checked={vehicleFilter} onCheckedChange={setVehicleFilter} />
        <span className=" text-base font-semibold capitalize">
          {t("vehicle")}
        </span>
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
        <div className="p-4 ">
          <div className="mt-4 flex justify-between items-center">
            <Label className="text-foreground/50  capitalize">
              Type de véhicule
            </Label>
            <Button
              variant="outline"
              size="icon"
              className="h-7 text-foreground/50"
              onClick={() => setVehicle({ type: undefined })}
            >
              <EraserIcon size={18} />
            </Button>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(4rem,1fr))] gap-2 mt-2">
            {vehicleTypes.map((type) => {
              const Icon = vehicleIcons[type];
              return (
                <button
                  onClick={() => setVehicle({ type })}
                  key={type}
                  className={cn(
                    "border-2 grid place-content-center border-foreground/25 aspect-video rounded transition-colors text-foreground/50",
                    {
                      "border-primary text-primary": vehicle.type === type,
                      "hover:text-foreground/75 ": vehicle.type !== type,
                    }
                  )}
                >
                  <Icon className="h-full" />
                </button>
              );
            })}
          </div>
          <div className="mt-4 flex justify-between items-center">
            <Label className="text-foreground/50  capitalize">Couleur</Label>
            <Button
              variant="outline"
              size="icon"
              className="h-7 text-foreground/50"
              onClick={() => setVehicle({ color: undefined })}
            >
              <EraserIcon size={18} />
            </Button>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(1.75rem,1fr))] gap-2 mt-2">
            {vehicleColors.map((color) => {
              const colorValue = colorsMap[color];
              return (
                <button
                  key={color}
                  className={cn(
                    "rounded aspect-square transition-colors border border-foreground/10 ",
                    {
                      "ring-2 ring-primary": vehicle.color === color,
                      "ring-2 ring-transparent hover:ring-primary":
                        vehicle.color !== color,
                    }
                  )}
                  style={{ backgroundColor: colorValue }}
                  onClick={() => setVehicle({ color })}
                />
              );
            })}
          </div>
          <div className="mt-4 flex justify-between items-center">
            <Label className="text-foreground/50  capitalize">brand</Label>
            <Button
              variant="outline"
              size="icon"
              className="h-7 text-foreground/50"
              onClick={() => setVehicle({ make: undefined })}
            >
              <EraserIcon size={18} />
            </Button>
          </div>
          <DebouncedInput
            className="mt-2"
            id="vehicle-brand"
            list="vehicle-brands"
            value={vehicle.make || ""}
            onValueChange={(value) => {
              setVehicle({
                make: value,
              });
            }}
          />
          <datalist id="vehicle-brands">
            {vehicleBrands.map((brand) => (
              <option key={brand} value={brand} />
            ))}
          </datalist>
        </div>
      </motion.div>
    </div>
  );
}
