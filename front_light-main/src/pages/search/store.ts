import { CameraType } from "@/utils";
import { create } from "zustand";

type Filters = {
  startDate: Date | null;
  endDate: Date | null;
  clothesFilter: boolean;
  faceFilter: boolean;
  vehicleFilter: boolean;
  lprFilter: boolean;
  vehicle: Record<string, any>;
  lpr: Record<string, any>;
  face: Record<string, any>;
  clothes: Record<string, any>;
};

type State = {
  ids: string[];
  search: string;
  cameras: CameraType[];
  tmpFilters: Filters;
  filters: Filters;
  page: number;
  perPage: number;
};

const defaultFilters: Filters = {
  startDate: null,
  endDate: null,
  clothesFilter: true,
  faceFilter: true,
  vehicleFilter: true,
  lprFilter: true,
  vehicle: { make: "" },
  lpr: { plate: "" },
  face: {},
  clothes: {},
};

const initialState: State = {
  ids: [],
  search: "",
  cameras: [],
  tmpFilters: { ...defaultFilters },
  filters: { ...defaultFilters },
  page: 1,
  perPage: 20,
};

type Actions = {
  setIds: (ids: string[]) => void;
  setSearch: (search: string) => void;
  setCameras: (cameras: CameraType[]) => void;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  selectId: (id: string) => void;
  deselectId: (id: string) => void;
  setClothesFilter: (clothesFilter: boolean) => void;
  setFaceFilter: (faceFilter: boolean) => void;
  setVehicleFilter: (vehicleFilter: boolean) => void;
  setLprFilter: (lprFilter: boolean) => void;
  setPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
  setVehicle: (data: Record<string, any>) => void;
  setLpr: (data: Record<string, any>) => void;
  setFace: (data: Record<string, string>) => void;
  setClothes: (data: Record<string, string>) => void;
  applyFilters: () => void;
  cancelFilters: () => void;
  getIsFiltered: () => boolean;
};

export const useSearchStore = create<State & Actions>((set, get) => ({
  ...initialState,
  setIds: (ids) => set({ ids }),
  setSearch: (search) => set({ search }),
  setCameras: (cameras) => set({ cameras }),
  setStartDate: (startDate) =>
    set({ tmpFilters: { ...get().tmpFilters, startDate } }),
  setEndDate: (endDate) =>
    set({ tmpFilters: { ...get().tmpFilters, endDate } }),
  selectId: (id) => {
    const exist = get().ids.includes(id);
    if (!exist) set({ ids: [...get().ids, id] });
  },
  deselectId: (id) => set({ ids: get().ids.filter((i) => i !== id) }),
  setClothesFilter: (clothesFilter) =>
    set({ tmpFilters: { ...get().tmpFilters, clothesFilter } }),
  setFaceFilter: (faceFilter) =>
    set({ tmpFilters: { ...get().tmpFilters, faceFilter } }),
  setVehicleFilter: (vehicleFilter) =>
    set({ tmpFilters: { ...get().tmpFilters, vehicleFilter } }),
  setLprFilter: (lprFilter) =>
    set({ tmpFilters: { ...get().tmpFilters, lprFilter } }),
  setPage: (page) => set({ page }),
  setPerPage: (perPage) => set({ perPage, page: 1 }),
  setVehicle: (data) =>
    set({
      tmpFilters: {
        ...get().tmpFilters,
        vehicle: { ...get().tmpFilters.vehicle, ...data },
      },
    }),
  setLpr: (data) =>
    set({
      tmpFilters: {
        ...get().tmpFilters,
        lpr: { ...get().tmpFilters.lpr, ...data },
      },
    }),
  setFace: (data) =>
    set({
      tmpFilters: {
        ...get().tmpFilters,
        face: { ...get().tmpFilters.face, ...data },
      },
    }),
  setClothes: (data) =>
    set({
      tmpFilters: {
        ...get().tmpFilters,
        clothes: { ...get().tmpFilters.clothes, ...data },
      },
    }),
  applyFilters: () => {
    set({ filters: get().tmpFilters, page: 1 });
  },
  cancelFilters: () => {
    set({ tmpFilters: get().filters });
  },
  getIsFiltered: () => {
    const { tmpFilters, filters } = get();
    return JSON.stringify(tmpFilters) === JSON.stringify(filters);
  },
}));
