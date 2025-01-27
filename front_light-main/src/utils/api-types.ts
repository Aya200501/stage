import { z } from "zod";
import {
  DashboardLayout,
  JsonObject,
  JsonValue,
  groupTypes,
  models,
  permissions,
} from ".";

export type User = {
  id: string;
  fullName: string;
  email: string;
  image: string;
  attributes: Record<string, unknown>;
  isSuperAdmin: boolean;
  roles: {
    groupId: string;
    role: Role;
    roleId: string;
  }[];
};

export type ManyResponse<T> = {
  results: T[];
  totalResult: number;
};

export type FindManyParams = {
  pagination?: {
    page: number;
    perPage: number;
  };
  where?: Record<string, unknown>;
  orderBy?: Record<string, "desc" | "asc">;
  include?: Record<string, unknown>;
  select?: Record<string, unknown> | string[];
};

export type FindByIdParams = {
  include?: Record<string, unknown>;
  select?: Record<string, unknown>;
};

export type ModelType = (typeof models)[number]["name"];

export type PermissionType = (typeof permissions)[number]["name"];

export type GroupType = (typeof groupTypes)[number];

export type Ability = {
  model: ModelType;
  permission: PermissionType;
};

export type Role = {
  id: string;
  name: string;
  color?: string;
  abilities: Ability[];
  createdAt?: Date;
};

export const coordinatesSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

export const polygonSchema = z.array(coordinatesSchema).min(3, {
  message: "polygon must have at least 3 points",
});

export type Coordinates = z.infer<typeof coordinatesSchema>;

export type TPolygon = z.infer<typeof polygonSchema>;

export type Group = {
  id: string;
  name: string;
  type: GroupType;
  polygon?: TPolygon;
  map?: string;
  parentId?: string;
  parent?: Group;
  subGroups?: Group[];
  dashboardLayouts: DashboardLayout[];
};

export type AnalyseType = {
  id: string;
  name: string;
  description: string;
  icon: string;
  disabled?: boolean;
  aiCode?: string;
  parents?: {
    id: string;
    name: string;
  }[];
  children?: {
    id: string;
    name: string;
    icon: string;
    description?: string;
    disabled?: boolean;
    configSchema?: {
      analyseConfigs: string[];
    };
    parents?: {
      id: string;
      name: string;
    }[];
  }[];
  configSchema: {
    analyseConfigs: string[];
  };
};

export type CameraType = {
  config: {
    httpPort: number;
    rtspLink: string;
    onvifPort: number;
    rtspLinkLocal: string;
    [key: string]: JsonValue;
  };
  description: string;
  id: string;
  ipAdress: string;
  latitude: number;
  longitude: number;
  model: string;
  name: string;
  password: string;
  port: number;
  reference: string;
  type: string;
  username: string;
  telemetries: Telemetry[];
  group: Group;
  brand: string;
  cameraAnalyses: {
    id: string;
    name: string;
    analyses: AnalyseType[];
  }[];
};

export type AlertStatus = 'ACTIVE' | 'PENDING' | 'RESOLVED' | 'DISMISSED' | 'CLOSED';

export type AlertActionType = AlertStatus | "NEW_COMMENT";

export type AlertDetails = {
  sceenshot?: string;
  [key: string]: JsonValue | undefined;
}

export type AlertAction = {
  id: string;
  content: string | null;
  createdAt: Date;
  type: AlertActionType;
  user: {
    id: string;
    fullName: string;
    image: string | null;
  };
};
export type AlertType = {
  id: string;
  level: "INFO" | "WARNING" | "CRITICAL";
  status: AlertStatus;
  message: string;
  description: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  workflowId: string;
  details: AlertDetails;
  workflow: {
    cameraAnalyse: {
      name: string;
      camera: {
        name: string;
        id: string;
      };
    } | null;
  };
  actions: AlertAction[];
};

export type Telemetry = {
  cameraId: string;
  name: string;
  value: JsonValue;
};

export type HistoryType = {
  _id: string;
  cameraId: string;
  videoId: string;
  createdAt: Date;
  screenshot: string;
  results: JsonObject;
};

export type LogType = {
  user: {
    id: string;
    name: string;
    image: string;
    role: {
      value: string;
      color: string;
    };
  };
  ipAddress: string;
  dateAndTime: {
    date: string;
    time: string;
  };
  function: string;
  status: {
    value: "add" | "edit" | "delete";
    label: string;
  };
  description: string;
};

export type AnalyseConfigsType =
  | "scale-up"
  | "scale-down"
  | "rotate"
  | "crop"
  | "polygon"
  | "polyline";

export type UserType = {
  id: string;
  fullName: string;
  email: string;
  image?: string;
  isSuperAdmin: boolean;
  createdAt: Date;
  attributes: any;
  roles: {
    id: string;
    group: { id: string; name: string };
    role: {
      id: string;
      name: string;
      color: string;
    };
  }[];
};

export const groupHierarchyOrder = [
  "COUNTRY",
  "REGION",
  "CITY",
  "SITE",
  "AREA",
];
