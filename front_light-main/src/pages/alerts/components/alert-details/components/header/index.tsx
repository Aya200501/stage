import { SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { AlertStatus } from "@/utils";
import { X } from "lucide-react";

interface AlertDetailsHeaderProps {
  name: string;
  status: AlertStatus;
  onClose: () => void;
}

export const AlertDetailsHeader = ({
  name,
  status,
  onClose,
}: AlertDetailsHeaderProps) => (
  <SheetHeader className="flex flex-row items-center justify-between text-xl px-3 text-white">
    <SheetTitle className="text-white flex-1">
      <span className="capitalize">{name}</span>
      <span>
        {" "}
        -{" "}
        {status === "ACTIVE" || status === "PENDING"
          ? "acknowledged"
          : "not acknowledged"}
      </span>
    </SheetTitle>
    <SheetClose className="!mt-0" onClick={onClose}>
      <X className="size-5" />
      <span className="sr-only">Close</span>
    </SheetClose>
  </SheetHeader>
);
