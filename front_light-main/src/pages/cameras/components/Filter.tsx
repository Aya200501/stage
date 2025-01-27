// import { CamerasStatuses } from "@/utils/constants";

// import { StatusButton } from "@/components/StatusButton";
import ParamsSearch from "@/components/params-search";
// import { ViewButtons } from "./ViewButtons";
import { AddCameraModal } from "./AddCameraModal";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface FilterProps {
  permissionLevel: number | undefined;
}

export const Filter = ({ permissionLevel }: FilterProps) => {
  return (
    <div className="flex w-full flex-wrap gap-2 [&>*]:order-2">
      <ParamsSearch className="h-10 py-0 !order-1 md:-order-none flex-[5] min-w-[17rem] max-w-[23rem] max-md:max-w-full " />
      <RadioGroup defaultValue="comfortable" className="flex mr-auto ">
        <div className="flex items-center space-x-2 border p-2 rounded-sm shadow-[0px_0px_5px_-3px]">
          <RadioGroupItem value="toutes" id="r1" />
          <Label htmlFor="r1">Toutes</Label>
        </div>
        <div className="flex items-center space-x-2 border p-2 rounded-sm shadow-[0px_0px_5px_-3px]">
          <RadioGroupItem
            value="en_ligne"
            id="r2"
            className="border-green-500"
          />
          <Label htmlFor="r2">En ligne</Label>
        </div>
        <div className="flex items-center space-x-2 border p-2 rounded-sm shadow-[0px_0px_5px_-3px]">
          <RadioGroupItem
            value="hors_ligne"
            id="r3"
            className="border-red-500"
          />
          <Label htmlFor="r3">Hors ligne</Label>
        </div>
      </RadioGroup>
      {/* {CamerasStatuses.map((status) => (
        <StatusButton
          {...status}
          key={status.value}
          handler={() => {}}
          className="flex-[2] md:flex-initial capitalize md:px-6"
        />
      ))} */}
      {/* <ViewButtons /> */}
      <div className="w-[300px] h-auto border flex justify-between items-center px-2 rounded-sm">
        <span>Configuration restantes</span>
        <span>0/10</span>
      </div>
      <AddCameraModal
        triggerSize="small"
        disabled={!permissionLevel || permissionLevel < 2}
      />
    </div>
  );
};
