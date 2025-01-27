import { GroupNodeTree } from "@/utils/group-node-tree";
import { create } from "zustand";

// Define groupTypes as a constant array with literal types
export const groupTypes = ["REGION", "CITY", "SITE", "AREA"] as const;

// Create a union type GroupType from the array
export type GroupType = (typeof groupTypes)[number];

// Define the hierarchy levels
const groupHierarchy: { [key in GroupType]: number } = {
  REGION: 1,
  CITY: 2,
  SITE: 3,
  AREA: 4,
};

interface CameraLocationState {
  selectedLocations: { [K in GroupType]: GroupNodeTree | null };
  setSelectedLocations: (type: GroupType, group: GroupNodeTree | null) => void;
}

export const useCameraLocationStore = create<CameraLocationState>((set) => ({
  selectedLocations: groupTypes.reduce(
    (acc, type) => ({ ...acc, [type]: null }),
    {} as Record<GroupType, GroupNodeTree | null>
  ),
  setSelectedLocations: (type, group) =>
    set((state) => {
      const currentLevel = groupHierarchy[type];
      const lowerTypes = groupTypes.filter(
        (gt) => groupHierarchy[gt] > currentLevel
      );
      const newState = {
        ...state.selectedLocations,
        [type]: group,
        ...lowerTypes.reduce((acc, t) => ({ ...acc, [t]: null }), {}),
      };
      return { selectedLocations: newState };
    }),
}));
