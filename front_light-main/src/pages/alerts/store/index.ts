import { AlertType } from "@/utils";
import { create } from "zustand";

export interface AlertState {
  items: AlertType[];
  setItems: (items: AlertType[]) => void;
  updateItem: (item: AlertType) => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  updateItem: (item) => set((state) => {
    const newItems = state.items.map((i) =>
      i.id === item.id ? { ...i, ...item } : i
    );
    return { items: newItems };
  })
}));