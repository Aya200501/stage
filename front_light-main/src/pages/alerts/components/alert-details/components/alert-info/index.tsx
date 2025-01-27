import { AlertType, formatDate } from "@/utils";
import { memo } from "react";

interface AlertInfoProps {
  alert: AlertType;
}

export const AlertInfo = memo(({ alert }: AlertInfoProps) => {
  const { description, createdAt, workflow } = alert;
  const cameraName = workflow?.cameraAnalyse?.camera?.name;
  return (
    <div className="flex flex-col gap-2 w-full overflow-hidden">
      <h3 className="font-medium">Détails de l&apos;alerte</h3>
      <div className="w-full flex flex-col gap-[6px] py-[10px] px-[16px] bg-[#3F3F3F] border-l-[5px] border-[#D22627] rounded-[10px]">
        <div className="text-[#ABBED1] text-sm font-medium flex items-center gap-2">
          Date et heure:
          <span className="text-white font-normal">
            {formatDate(new Date(createdAt))}
          </span>
        </div>
        <div className="text-[#ABBED1] text-sm font-medium flex items-center gap-2">
          Caméra:
          <span className="text-white font-normal">{cameraName || "----"}</span>
        </div>
        <div className="text-[#ABBED1] text-sm font-medium flex items-center gap-2">
          Description:
          <span className="text-white font-normal">
            {description || "----"}
          </span>
        </div>
      </div>
    </div>
  );
});
