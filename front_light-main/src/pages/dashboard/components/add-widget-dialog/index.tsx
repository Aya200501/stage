import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { ElementRef, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useGridStore } from "../../utils/grid-store";
import { Step1 } from "../step1";
import WidgetLogo from "../widget-logo";
import { useAddWidgetStore } from "../../utils/add-widget-store";
import LineChartOptions from "../line-chart-options";
import CardOptions from "../card-options";
import { VideoOptions } from "../video-options";
import PieChartOptions from "../pie-chart-options";
import GaugeOptions from "../gauge-options";
import TableOptions from "../table-options";
import { useTranslation } from "react-i18next";

const AddWidgetDialog = () => {
  const { t } = useTranslation();
  const { addWidget, widgetId, setWidgetId } = useGridStore();

  const { data, step, setStep, setData, nextStep, getDisabled } =
    useAddWidgetStore();
  const closeRef = useRef<ElementRef<"button">>(null);

  const clear = () => {
    setData({
      title: "",
      type: "card",
      attributes: {},
    });
    setStep(0);
  };
  const handleClose = () => {
    closeRef.current?.click();
    setWidgetId(null);
    clear();
  };

  const handleSubmit = () => {
    addWidget(data);
    handleClose();
  };

  const Step2 = useCallback(() => {
    if (data.type === "lineChart") return <LineChartOptions />;
    if (data.type === "areaChart") return <LineChartOptions />;
    if (data.type === "barChart") return <LineChartOptions />;
    if (data.type === "pieChart") return <PieChartOptions />;
    if (data.type === "donutChart") return <PieChartOptions />;
    if (data.type === "card") return <CardOptions />;
    if (data.type === "gauge") return <GaugeOptions />;
    if (data.type === "video") return <VideoOptions />;
    if (data.type === "table") return <TableOptions />;
    return null;
  }, [data.type]);

  return (
    <Dialog
      open={!!widgetId}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent
        className={cn("max-w-md max-h-screen overflow-y-auto ", {
          "max-w-4xl": step === 1 && ["table"].includes(data.type),
          "max-w-2xl":
            step === 1 &&
            [
              "pieChart",
              "donutChart",
              "lineChart",
              "barChart",
              "areaChart",
            ].includes(data.type),
          "max-w-xl":
            step === 1 && ["radarChart", "qrCode"].includes(data.type),
          // "max-w-lg": step === 1 && ["table"].includes(data.type),
        })}
      >
        <DialogHeader className="font-semibold flex items-center justify-center">
          <span className="first-letter:uppercase">
            {step === 0 ? (
              `${widgetId === "new" ? t("add") : t("edit")} widget`
            ) : (
              <div className="w-20">
                <WidgetLogo
                  type={data.type}
                  className="bg-transparent dark:bg-transparent py-0"
                />
              </div>
            )}{" "}
          </span>
        </DialogHeader>
        {
          {
            0: <Step1 />,
            1: <Step2 />,
          }[step]
        }
        <div className="flex items-center justify-end gap-4 pt-4">
          <Button variant="outline" onClick={handleClose}>
            <span className="first-letter:uppercase">{t("cancel")}</span>
          </Button>
          {step === 1 && (
            <Button
              onClick={() => {
                setStep(0);
              }}
            >
              <span className="first-letter:uppercase">{t("previous")}</span>
            </Button>
          )}
          <Button
            disabled={getDisabled()}
            onClick={step === 1 ? handleSubmit : nextStep}
          >
            <span className="first-letter:uppercase">
              {step === 0 ? t("next") : t("save")}
            </span>
          </Button>
        </div>
        <DialogClose ref={closeRef} hidden />
      </DialogContent>
    </Dialog>
  );
};

export default AddWidgetDialog;
