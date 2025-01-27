import { Layout } from "react-grid-layout";
import {
  tableDisplayFormats,
  widgetCardCountElements,
  widgetCardTypes,
  widgetTypes,
  groupByOptions as groupByOptions,
  videoTypes,
} from "./constants";
import { Group, ModelType } from "./api-types";

export type NonUndefined<T> = T extends undefined ? never : T;

export type WidgetType = (typeof widgetTypes)[number];

export type Literal = string | number | boolean | null | Date;

export type JsonValue = Literal | JsonArray | JsonObject;

export type JsonArray = JsonValue[];

export type JsonObject = { [key: string]: JsonValue };

export type Widget = {
  id: string;
  title: string;
  type: WidgetType;
  description?: string;
  attributes?: JsonObject;
};

export type DateRange = {
  from?: Date;
  to?: Date;
};

export type DashboardLayout = {
  id: string;
  groupId: number;
  name: string;
  data: {
    layouts: Layout[];
    widgets: Widget[];
  };
  createdAt: Date;
  updatedAt: Date;
};

export type BatteryWidgetData = {
  serial?: string;
  telemetryName?: string;
  direction?: "vertical" | "horizontal";
  stops?: {
    stop: number;
    color: string;
  }[];
};

export type VideoType = (typeof videoTypes)[number];

export type VideoWidgetData = {
  type: VideoType;
  cameraId?: string;
  url?: string;
};

export type ChartTelemetry = {
  cameraId: string;
  name: string;
  label?: string;
  unit?: string;
  color?: string;
  type?: string;
  filterValue?: string | number;
  coefficient?: number;
};

export type GaugeWidgetData = {
  cameraId: string;
  telemetryName: string;
  unit?: string;
  showNeedle?: boolean;
  stops: {
    stop: number;
    color: string;
  }[];
};

export type WidgetCardType = (typeof widgetCardTypes)[number];
export type WidgetCardCountElement = (typeof widgetCardCountElements)[number];

export type LineChartWidgetData = {
  telemetries?: ChartTelemetry[];
  defaultGroupBy?: TGroupBy;
  type?: "line" | "area";
};

export type TableDisplayForma = (typeof tableDisplayFormats)[number];

export type Mapping = {
  telemetryName: string;
  displayName?: string;
  displayFormat?: TableDisplayForma;
};

export type TableWidgetData = {
  cameraId?: string;
  mappings: Mapping[];
};

export type TGroupBy = (typeof groupByOptions)[number];

export class GroupNode {
  name: string;
  parent?: GroupNode | null;
  children: GroupNode[];
  id: string;
  ability: Record<ModelType, number>;

  constructor(
    group: Group,
    ability: Record<ModelType, number>,
    parent: GroupNode | null,
    children: GroupNode[]
  ) {
    this.name = group.name;
    this.children = children;
    this.children.forEach((child) => {
      child.parent = this;
    });
    this.parent = parent;
    this.id = group.id;
    this.ability = ability;
  }
}
