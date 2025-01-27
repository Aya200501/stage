import React, { ElementRef, useRef } from "react";
import ColorPicker from "@/components/color-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAddWidgetStore } from "@/pages/dashboard/utils/add-widget-store";

const defaultData = {
  stop: undefined as number | undefined,
  color: "#d32727",
};

export default function AddArc({ className }: { className?: string }) {
  const { addStop } = useAddWidgetStore();
  const [data, setData] = React.useState(defaultData);
  const closeRef = useRef<ElementRef<"button">>(null);

  const { stop, color } = data;
  const handleClose = () => {
    closeRef.current?.click();
    setData(defaultData);
  };

  const handleAdd = () => {
    if (!stop || !color) return;
    addStop(stop, color);
    handleClose();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost" className={className}>
          add arc stop
        </Button>
      </PopoverTrigger>
      <PopoverContent className="grid grid-cols-[min-content,1fr] z-[9999] gap-x-2 gap-y-3  items-center [&>*]:whitespace-nowrap ">
        <Label>stop</Label>
        <Input
          type="number"
          value={stop}
          onChange={(e) => setData({ ...data, stop: Number(e.target.value) })}
        />
        <Label>color</Label>
        <ColorPicker
          className="h-8"
          color={color}
          onChange={(color) => setData({ ...data, color })}
        />

        <div className="col-span-full flex justify-end gap-4 pb-2">
          <Button variant="ghost" onClick={handleClose}>
            cancel
          </Button>
          <Button disabled={!stop || !color} onClick={handleAdd}>
            add
          </Button>
        </div>
        <PopoverClose ref={closeRef} hidden />
      </PopoverContent>
    </Popover>
  );
}
