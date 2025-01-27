import { AlertType } from '@/utils';
import { create } from 'zustand';

interface AlertDetailsDrawerStore {
  isOpen: boolean;
  alert?: AlertType;
  open: (alert: AlertType) => void;
  close: () => void;
  setAlert: (alert: AlertType) => void;
}

export const useAlertDetailsDrawer = create<AlertDetailsDrawerStore>((set) => ({
  isOpen: false,
  alert: undefined,
  setAlert: (alert) => set({ alert }),
  open: (alert) => set({ isOpen: true, alert }),
  close: () => set({ isOpen: false, alert: undefined }),
}));