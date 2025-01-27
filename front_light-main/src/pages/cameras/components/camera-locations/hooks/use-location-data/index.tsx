// hooks/useLocationData.ts
import { useMemo } from "react";
import { useGlobalContext } from "@/Context";
import { GroupNodeTree } from "@/utils/group-node-tree";
import { GroupType } from "../../store";

export const useLocationData = (selectedLocations: {
  [K in GroupType]: GroupNodeTree | null;
}) => {
  const { currentGroup } = useGlobalContext();

  const regions = currentGroup?.getGroupsByTypeHierarchy("REGION") || [];

  const cities = useMemo(() => {
    if (!selectedLocations.REGION) return [];
    const citiesInHierarchy =
      currentGroup?.getGroupsByTypeHierarchy("CITY") || [];
    const citiesInRegion = selectedLocations.REGION?.children || [];
    return citiesInHierarchy.filter((cityInHierarchy) =>
      citiesInRegion.some(
        (cityInRegion) => cityInRegion.id === cityInHierarchy.id
      )
    );
  }, [selectedLocations.REGION, currentGroup]);

  const sites = useMemo(() => {
    if (!selectedLocations.CITY) return [];
    const sitesInHierarchy =
      currentGroup?.getGroupsByTypeHierarchy("SITE") || [];
    const sitesInCity = selectedLocations.CITY?.children || [];
    return sitesInHierarchy.filter((siteInHierarchy) =>
      sitesInCity.some((siteInCity) => siteInCity.id === siteInHierarchy.id)
    );
  }, [selectedLocations.CITY, currentGroup]);

  const areas = useMemo(() => {
    if (!selectedLocations.SITE) return [];
    const areasInHierarchy =
      currentGroup?.getGroupsByTypeHierarchy("AREA") || [];
    const areasInSite = selectedLocations.SITE?.children || [];
    return areasInHierarchy.filter((areaInHierarchy) =>
      areasInSite.some((areaInSite) => areaInSite.id === areaInHierarchy.id)
    );
  }, [selectedLocations.SITE, currentGroup]);

  return { regions, cities, sites, areas };
};
