/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { env } from "@/lib/env";
import {
  FindManyParams,
  ManyResponse,
  FindByIdParams,
  User,
  HistoryType,
} from "@/utils";

const WAIT_TIME = 250;

export function stringify(value: unknown) {
  if (typeof value === "string") return value;
  return JSON.stringify(value);
}

export function convertParams(params?: FindManyParams) {
  if (!params) return undefined;
  const { pagination, where, orderBy, include, select } = params;

  return {
    take: pagination?.perPage,
    skip: pagination && (pagination.page - 1) * pagination.perPage,
    where: where && stringify(where),
    orderBy: orderBy && stringify(orderBy),
    include: include && stringify(include),
    select: select && stringify(select),
  };
}
export default class BackendApi {
  private api = axios.create({
    baseURL: env.VITE_BACKEND_API,
  });

  private accessToken = "";
  private refreshToken = "";
  private logoutCallback: () => void = () => {};

  constructor({
    accessToken = "",
    refreshToken = "",
    logoutCallback = () => {},
  }: {
    accessToken?: string;
    refreshToken?: string;
    logoutCallback?: () => void;
    ip?: string;
  }) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.logoutCallback = logoutCallback;
    this.api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    this.api.defaults.headers.common["ngrok-skip-browser-warning"] = "69420";
    this.api.defaults.headers.common["client-ip"] =
      window.localStorage.getItem("client-ip");
    this.api.interceptors.response.use(
      (res) => res,
      async (err) => {
        const url = err.config.url;
        if (
          err.response?.status === 401 &&
          url !== "/auth/signin" &&
          url !== "/auth/signup" &&
          url !== "/auth/refreshtoken"
        ) {
          try {
            if (!this.refreshToken) {
              throw new Error("Unauthorized");
            }
            const res = await this.api.post("/auth/refreshtoken", {
              refreshToken: this.refreshToken,
            });
            this.accessToken = res.data.token;
            this.api.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${res.data.token}`;

            window.localStorage.setItem(
              "accessToken",
              JSON.stringify(res.data.token)
            );
            const originalRequest = err.config;
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${res.data.token}`;
            return this.api.request(originalRequest);
          } catch (err) {
            void err;
            this.accessToken = "";
            this.refreshToken = "";
            window.localStorage.removeItem("accessToken");
            window.localStorage.removeItem("refreshToken");
            this.logoutCallback();
          }
        } else return Promise.reject(err);
      }
    );
  }

  isReady() {
    return !!this.accessToken && !!this.refreshToken;
  }

  async login(data: { email: string; password: string }): Promise<{
    user: User;
    accessToken: string;
    refreshToken: string;
  }> {
    await new Promise((resolve) => setTimeout(resolve, WAIT_TIME));
    const res = await this.api.post("/auth/signin", data);
    return res.data;
  }

  async signup(data: {
    fullName: string;
    email: string;
    password: string;
  }): Promise<{
    user: User;
    accessToken: string;
    refreshToken: string;
  }> {
    await new Promise((resolve) => setTimeout(resolve, WAIT_TIME));
    const res = await this.api.post("/auth/signup", data);
    return res.data;
  }

  async signOut(refreshToken: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, WAIT_TIME));
    await this.api.post("/auth/singout", {
      refreshToken,
    });
  }

  async getCurrentUser(): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, WAIT_TIME));
    const res = await this.api.get("/auth/me");
    return res.data;
  }

  async getHistory({
    cameraId,
    skip,
    take,
    select,
    startDate,
    endDate,
    orderBy,
    where,
  }: {
    cameraId: string;
    select: string[];
    startDate?: Date;
    endDate?: Date;
    take?: number;
    skip?: number;
    orderBy?: string;
    where?: any;
  }) {
    const res = await this.api.get("/history", {
      params: {
        cameraId,
        select: select.join(","),
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
        take,
        skip,
        orderBy,
        where: where && JSON.stringify(where),
      },
    });
    return res.data as HistoryType[];
  }

  async getTelemetry({
    startDate,
    endDate,
    ...filters
  }: {
    cameraId: string;
    startDate?: Date;
    endDate?: Date;
    name: string;
    type?: string;
    filterValue?: any;
  }) {
    const res = await this.api.get("/history/telemetry", {
      params: {
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
        ...filters,
      },
    });
    return res.data as HistoryType;
  }

  async findMany<T>(
    route: string,
    params?: FindManyParams
  ): Promise<ManyResponse<T>> {
    await new Promise((resolve) => setTimeout(resolve, WAIT_TIME));
    const res = await this.api.get(route, {
      params: convertParams(params),
    });
    return res.data;
  }

  async FindById<T>(
    route: string,
    id: string,
    params?: FindByIdParams
  ): Promise<T> {
    const res = await this.api.get(`${route}/${id}`, {
      params: convertParams(params),
    });
    return res.data;
  }

  async create<T>(
    route: string,
    data?: any,
    params?: FindByIdParams
  ): Promise<T> {
    await new Promise((resolve) => setTimeout(resolve, WAIT_TIME));
    const res = await this.api.post(route, data, {
      params: convertParams(params),
    });
    return res.data;
  }

  async update<T>(
    route: string,
    id: string,
    data?: any,
    params?: FindByIdParams
  ): Promise<T> {
    await new Promise((resolve) => setTimeout(resolve, WAIT_TIME));
    const res = await this.api.patch(`${route}/${id}`, data, {
      params: convertParams(params),
    });
    return res.data;
  }

  async DeleteById<T>(route: string, id: string): Promise<T> {
    await new Promise((resolve) => setTimeout(resolve, WAIT_TIME));
    const res = await this.api.delete(`${route}/${id}`);
    return res.data;
  }
}
