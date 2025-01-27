import {
  BatteryWidgetData,
  ChartTelemetry,
  GaugeWidgetData,
  JsonValue,
  TableWidgetData,
  VideoWidgetData,
  Widget,
  WidgetCardType,
  WidgetType,
} from "@/utils";
import { create } from "zustand";

type State = {
  data: Omit<Widget, "id">;
  step: number;
};

type Actions = {
  setData: (data: Omit<Widget, "id">) => void;
  setStep: (step: number) => void;
  setTitle: (name: string) => void;
  setDescription: (description: string) => void;
  setType: (type: WidgetType) => void;
  addTelemetry: (data: ChartTelemetry, allowDuplicate?: boolean) => void;
  deleteTelemetry: (telemetry: ChartTelemetry, index?: number) => void;
  addStop: (stop: number, color: string) => void;
  deleteStop: (index: number) => void;
  nextStep: () => void;
  getDisabled: () => boolean;
  setAttribute: (key: string, value: JsonValue) => void;
};

export const useAddWidgetStore = create<State & Actions>((set, get) => ({
  data: {
    title: "",
    type: "card",
    attributes: {},
  },
  step: 0,
  setData: (data: Omit<Widget, "id">) => {
    set({ data });
  },
  setStep: (step: number) => {
    set({ step });
  },
  setTitle: (name: string) => {
    set({
      data: {
        ...get().data,
        title: name,
      },
    });
  },
  setDescription: (description: string) => {
    set({
      data: {
        ...get().data,
        description,
      },
    });
  },
  setType: (type: WidgetType) => {
    set({
      data: {
        ...get().data,
        type,
        attributes: {},
      },
    });
  },
  addTelemetry: (data: ChartTelemetry, allowDuplicate = false) => {
    const telemetries = (get().data.attributes?.telemetries ||
      []) as ChartTelemetry[];
    const exist = telemetries.find(
      (item) => item.cameraId === data.cameraId && item.name === data.name
    );
    if (!allowDuplicate && exist) return;
    const newTelemetries = [...telemetries, data];
    set({
      data: {
        ...get().data,
        attributes: {
          ...get().data.attributes,
          telemetries: newTelemetries,
        },
      },
    });
  },
  deleteTelemetry: (telemetry: ChartTelemetry, index?: number) => {
    const telemetries = (get().data.attributes?.telemetries ||
      []) as ChartTelemetry[];
    let newTelemetries: ChartTelemetry[] = [];
    if (index == undefined)
      newTelemetries = telemetries.filter((item) => {
        return (
          item.cameraId !== telemetry.cameraId || item.name !== telemetry.name
        );
      });
    else newTelemetries = telemetries.filter((_, i) => i !== index);
    set({
      data: {
        ...get().data,
        attributes: {
          ...get().data.attributes,
          telemetries: newTelemetries,
        },
      },
    });
  },
  nextStep: () => {
    const step = get().step;
    const title = get().data.title;
    if (step === 1 || !title) return;
    set({ step: step + 1 });
  },
  getDisabled: () => {
    const step = get().step;
    const title = get().data.title;
    const type = get().data.type;
    const telemetries = get().data.attributes?.telemetries as ChartTelemetry[];
    if (!title) return true;
    if (
      step === 1 &&
      ["lineChart", "barChart", "areaChart"].includes(type) &&
      !telemetries?.length
    )
      return true;
    if (step === 1 && type === "card") {
      const cardType = get().data.attributes?.type as WidgetCardType;
      const content = get().data.attributes?.content;
      const element = get().data.attributes?.element;
      const cameraId = get().data.attributes?.cameraId;
      const telemetryName = get().data.attributes?.telemetryName;
      if (!cardType) return true;
      if (cardType === "text" && !content) return true;
      if (cardType === "count" && !element) return true;
      if (cardType === "telemetry" && (!cameraId || !telemetryName)) {
        return true;
      }
    }
    if (step === 1 && type === "gauge") {
      const gaugeData = get().data.attributes as GaugeWidgetData;
      const { cameraId, telemetryName, stops } = gaugeData;
      return !cameraId || !telemetryName || !stops || !stops.length;
    }
    if (step === 1 && type === "video") {
      const { cameraId, type, url } = get().data.attributes as VideoWidgetData;
      if (type === "camera" || type === "ws") return !cameraId;
      else return !url;
    }
    if (step === 1 && type === "table") {
      const { cameraId, mappings } = get().data.attributes as TableWidgetData;
      return !cameraId || !mappings || !mappings.length;
    }

    return false;
  },
  addStop: (stop: number, color: string) => {
    const stops =
      (get().data.attributes?.stops as BatteryWidgetData["stops"]) || [];
    const newStops = [...stops, { stop, color }];
    set({
      data: {
        ...get().data,
        attributes: {
          ...get().data.attributes,
          stops: newStops,
        },
      },
    });
  },
  deleteStop: (index: number) => {
    const stops =
      (get().data.attributes?.stops as BatteryWidgetData["stops"]) || [];
    const newStops = stops.filter((_, i) => i !== index);
    set({
      data: {
        ...get().data,
        attributes: {
          ...get().data.attributes,
          stops: newStops,
        },
      },
    });
  },
  setAttribute: (key: string, value: JsonValue) => {
    set({
      data: {
        ...get().data,
        attributes: {
          ...get().data.attributes,
          [key]: value,
        },
      },
    });
  },
}));
