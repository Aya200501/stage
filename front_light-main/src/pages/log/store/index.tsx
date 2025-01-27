import { create } from "zustand";
import { LogsType } from "../component/log-columns";

interface LogsStore {
  items: LogsType[];
  setItems: (items: LogsType[]) => void;
}

export const useLogs = create<LogsStore>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
}));
