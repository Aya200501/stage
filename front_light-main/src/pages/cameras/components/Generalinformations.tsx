import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { cn } from "@/lib/utils";
import { FormInput } from "@/components/FormInput";
import { cameraTypes } from "@/utils";
import { CameraMarks } from "@/utils/constants";
import { CameraPositionPicker } from "./CameraPositionPicker";
import { SelectSearch } from "./select-search";
import { useTranslation } from "react-i18next";
import { CameraLocations } from "./camera-locations";

interface GeneralinformationsProps {
  control: any;
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

export const Generalinformations = ({
  control,
  watch,
  setValue,
}: GeneralinformationsProps) => {
  const selectedMark = watch("mark");

  const cameraModels = [
    ...new Set(CameraMarks.find((mark) => mark.mark === watch("mark"))?.models),
  ];

  const handleMarkChange = (mark: string) => {
    const rtspLink =
      CameraMarks.find((camera) => camera.mark === mark)?.rtspLink || "";
    setValue("rtspLink", rtspLink);
    setValue("model", "");
  };
  const { t } = useTranslation();
  return (
    <div className="w-full flex flex-col gap-2.5">
      <div className="grid w-full gap-4 xl:grid-cols-2">
        <div className="flex w-full flex-col gap-2.5">
          <FormInput
            control={control}
            name="cameraName"
            label={t("cameraName")}
            placeholder={t("cameraName")}
            isRequired
          />
          <FormInput
            control={control}
            name={"description"}
            label={t("description")}
            placeholder={t("description")}
          />
          <SelectSearch
            name="mark"
            control={control}
            data={CameraMarks || []}
            label={t("cameraBrand")}
            placeholder={t("selectBrand")}
            onSelect={handleMarkChange}
          />
          {selectedMark === "other" ? (
            <FormInput
              control={control}
              name="model"
              label={t("cameraModel")}
              placeholder={t("cameraModel")}
              isRequired
            />
          ) : (
            <SelectSearch
              name="model"
              control={control}
              data={cameraModels}
              label={t("cameraModel")}
              placeholder={t("selectModel")}
              disabled={!selectedMark}
            />
          )}
          <CameraLocations control={control} setValue={setValue} />
        </div>
        <div className="flex flex-col space-y-2">
          <div className="text-sm font-medium text-[#F5F7FA]">
            Camera type
            <span className="text-red-500">*</span>
          </div>
          <FormField
            control={control}
            name="cameraType"
            render={({ field }) => (
              <FormItem className="">
                <FormControl>
                  <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2">
                    {cameraTypes.map((cameraType, index) => (
                      <div
                        key={index}
                        className={cn(
                          "flex w-full min-w-52 flex-1 cursor-pointer flex-col items-center justify-center gap-4 rounded-lg bg-[#383838] px-4 h-[12.65rem]  hover:bg-[#383838]/70",
                          field.value === cameraType.label &&
                            "ring-2 ring-[#D22627]"
                        )}
                        onClick={() => field.onChange(cameraType.label)}
                      >
                        <img
                          src={cameraType.icon}
                          alt={cameraType.label}
                          className="size-10"
                        />
                        <span className="text-sm font-medium text-[#F5F7FA] ">
                          {t(cameraType.label)}
                        </span>
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage className="text-[#D22627]" />
              </FormItem>
            )}
          />
        </div>
      </div>
      <CameraPositionPicker control={control} watch={watch} />
    </div>
  );
};
