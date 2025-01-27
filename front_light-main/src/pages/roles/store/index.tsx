import { Role } from "@/utils";
import { create } from "zustand";

interface RolesStore {
  items: Role[];
  setItems: (items: Role[]) => void;
}

export const useRoles = create<RolesStore>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
}));
