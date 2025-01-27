import { useTranslation } from "react-i18next";
import { useCameraLocationStore } from "./store";
import { LocationSelector } from "./components/location-selector";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import { useLocationData } from "./hooks/use-location-data";

interface CameraLocationsProps {
  control: any;
  setValue: UseFormSetValue<FieldValues>;
}

export const CameraLocations = ({
  control,
  setValue,
}: CameraLocationsProps) => {
  const { t } = useTranslation();
  const selectedLocations = useCameraLocationStore(
    (state) => state.selectedLocations
  );
  const { regions, cities, sites, areas } = useLocationData(selectedLocations);

  const reset = (level: string) => {
    if (level === "area") return;
    setValue("area", "");
    if (level === "site") return;
    setValue("site", "");
    if (level === "city") return;
    setValue("city", "");
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="text-base text-[#F5F7FA] first-letter:underline-offset-0">
        {t("location")}
        <span className="text-red-500">*</span>
      </div>
      <div className="grid gap-2.5 grid-cols-2">
        <LocationSelector
          control={control}
          name="region"
          placeholder={t("region")}
          data={regions}
          groupType="REGION"
          onSelect={reset}
        />
        <LocationSelector
          control={control}
          name="city"
          placeholder={t("city")}
          data={cities}
          groupType="CITY"
          disabled={!selectedLocations.REGION}
          onSelect={reset}
        />
        <LocationSelector
          control={control}
          name="site"
          placeholder={t("site")}
          data={sites}
          groupType="SITE"
          disabled={!selectedLocations.CITY}
          onSelect={reset}
        />
        <LocationSelector
          control={control}
          name="area"
          placeholder={t("area")}
          data={areas}
          groupType="AREA"
          disabled={!selectedLocations.SITE}
          onSelect={reset}
        />
      </div>
    </div>
  );
};
