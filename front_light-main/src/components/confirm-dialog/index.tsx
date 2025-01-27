/* eslint-disable react-refresh/only-export-components */
import { create } from "zustand";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

type State = {
  isOpen: boolean;
  onConfirm: () => void | Promise<void>;
  onClose: () => void;
  confirmTitle: string;
  confirmMessage: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
};

const defaultState: State = {
  isOpen: false,
  onConfirm: async () => {},
  onClose: () => {},
  confirmTitle: "Are you sure?",
  confirmMessage:
    "This action cannot be undone. Are you sure you want to proceed?",
  confirmButtonText: "Confirm",
  cancelButtonText: "Cancel",
};

type Actions = {
  confirm: (data: {
    confirmTitle?: string;
    confirmMessage?: string;
    onConfirm: () => void | Promise<void>;
    onClose?: () => void;
  }) => void;
  reset: () => void;
};

export const useConfirmDialog = create<State & Actions>((set) => ({
  ...defaultState,
  confirm: ({ confirmTitle, confirmMessage, onConfirm, onClose }) => {
    set({
      isOpen: true,
      onConfirm,
      confirmTitle: confirmTitle ?? defaultState.confirmTitle,
      confirmMessage: confirmMessage ?? defaultState.confirmMessage,
      onClose: onClose ?? defaultState.onClose,
    });
  },
  reset: () => set(defaultState),
}));

export function ConfirmDialog() {
  const {
    isOpen,
    confirmTitle,
    confirmMessage,
    confirmButtonText,
    cancelButtonText,
    onConfirm,
    onClose,
    reset,
  } = useConfirmDialog();

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      reset();
    }, 0);
  };

  const handleConfirm = async () => {
    await onConfirm();
    handleClose();
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          handleClose();
        }
      }}
    >
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle>{confirmTitle}</DialogTitle>
          <DialogDescription className="mt-4 inline-block ">
            {confirmMessage}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-8">
          <Button onClick={handleClose} variant="outline" className="mr-2">
            {cancelButtonText}
          </Button>
          <Button onClick={handleConfirm} type="submit">
            {confirmButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
