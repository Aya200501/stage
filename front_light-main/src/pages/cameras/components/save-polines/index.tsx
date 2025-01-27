import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useStoreAnalyse } from "../CameraConfigModal/analyseConfig/store";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PolineNames = [
  "car",
  "fouille",
  "customs_officier_check",
  "comptage line_personne",
];

function DialogSavePoline() {
  const {
    type,
    lines,
    setLines,
    polygons,
    setPolygons,
    lineNames,
    setType,
    polygonNames,
    setPolygonNames,
    setLineNames,
  } = useStoreAnalyse();
  const [name, setName] = useState("");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={
            (type === "line" && lines?.[lines?.length - 1]?.length < 2) ||
            (type === "polygon" && polygons?.[polygons?.length - 1]?.length < 3)
          }
          type="button"
          className="absolute top-[50px] right-2 bg-[#383838]"
        >
          Save
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {`Save the ${type === "line" ? "line" : "polygon"}`} name
          </DialogTitle>
          <DialogDescription className="flex gap-4 mt-2">
            <Select
              value={name}
              onValueChange={(value) => {
                setName(value);
              }}
            >
              <SelectTrigger className="w-full p-2 border border-gray-300 rounded-md">
                <SelectValue
                  placeholder={`Select the  ${
                    type === "line" ? "line" : "polygon"
                  } name`}
                />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectGroup>
                  {PolineNames.map((name, index) => (
                    <SelectItem key={index} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <DialogClose
              className="hidden"
              id="close_save_polines"
            ></DialogClose>
            <Button
              onClick={() => {
                if (type === "line") {
                  setLineNames([...lineNames, name]);
                  setLines([...lines, []]);
                } else {
                  setPolygonNames([...polygonNames, name]);
                  setPolygons([...polygons, []]);
                }
                setName("");
                setType(null);
                document.getElementById("close_save_polines")?.click();
              }}
            >
              {type === "line" ? "Save Line" : "Save Polygon"}
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default DialogSavePoline;
