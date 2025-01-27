import { create } from "zustand";
import { CameraType } from "@/utils";

interface CamerasStore {
  items: CameraType[];
  setItems: (items: CameraType[]) => void;
}

export const useCameras = create<CamerasStore>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
}));
