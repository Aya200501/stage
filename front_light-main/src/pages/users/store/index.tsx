import { UserType } from "@/utils";
import { create } from "zustand";

interface UsersStore {
  items: UserType[];
  setItems: (items: UserType[]) => void;
}

export const useUsers = create<UsersStore>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
}));
