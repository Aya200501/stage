/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { type Crop } from "react-image-crop";
import { AnalyseType } from "@/utils";

type State = {
  type: string | null;
  zoom: number;
  imageSrc: string | Blob | Buffer | File | null;
  crop: Crop | null;
  canvasRef: HTMLCanvasElement | null;
  analyse: AnalyseType | null;
  cameraId: string | null;
  rotation: number;
  width: number;
  height: number;
  name: string;
  analysesId: string | null;
  polygons: {
    x: number;
    y: number;
  }[][];
  lines: {
    x: number;
    y: number;
  }[][];
  analysesSelectedIdStor: string[];
  configsSelected: any[];
  open: boolean;
  parentSelected: any[];
  polygonNames: string[];
  lineNames: string[];
};

type Actions = {
  setRotation: (rotation: number) => void;
  setAnalyse: (analyse: AnalyseType | null) => void;
  setCameraId: (cameraId: string | null) => void;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setAnalysesId: (analysesId: string | null) => void;
  setType: (
    type: "line" | "polygon" | "crop" | "rotate" | "zoomIn" | "zoomOut" | null
  ) => void;
  setZoom: (zoom: number) => void;
  setConfigsSelected: (configsSelected: any[]) => void;
  setImageSrc: (imageSrc: string | Blob | Buffer | File | null) => void;
  setCrop: (crop: Crop | null) => void;
  setCanvasRef: (canvasRef: HTMLCanvasElement) => void;
  setPolygons: (polygon: { x: number; y: number }[][]) => void;
  setLines: (line: { x: number; y: number }[][]) => void;
  setName: (name: string) => void;
  setAnalysesSelectedIdStor: (analysesSelectedIdStor: string[]) => void;
  setOpen: (open: boolean) => void;
  setParentSelected: (parentSelected: any[]) => void;
  setPolygonNames: (polygonNames: string[]) => void;
  setLineNames: (lineNames: string[]) => void;
};

const defaultState: State = {
  type: null,
  zoom: 1,
  analysesId: null,
  imageSrc: null,
  crop: null,
  canvasRef: null,
  analyse: null,
  cameraId: null,
  rotation: 0,
  polygons: [],
  lines: [],
  name: "",
  width: 0,
  height: 0,
  analysesSelectedIdStor: [],
  configsSelected: [],
  open: false,
  parentSelected: [],
  polygonNames: [],
  lineNames: [],
};

export const useStoreAnalyse = create<State & Actions>((set) => ({
  ...defaultState,
  setType: (
    type: "line" | "polygon" | "crop" | "rotate" | "zoomIn" | "zoomOut" | null
  ) => set({ type }),
  setRotation: (rotation) => set({ rotation }),
  setZoom: (zoom: number) => set({ zoom }),
  setAnalysesSelectedIdStor: (analysesSelectedIdStor) =>
    set({ analysesSelectedIdStor }),
  setCameraId: (cameraId) => set({ cameraId }),
  setAnalyse: (analyse) => set({ analyse }),
  setImageSrc: (imageSrc: string | Blob | Buffer | File | null) =>
    set({ imageSrc }),
  setCanvasRef: (canvasRef) => set({ canvasRef }),
  setCrop: (crop) => set({ crop }),
  setPolygons: (polygons) => set({ polygons }),
  setLines: (lines) => set({ lines }),
  setName: (name) => set({ name }),
  setWidth: (width) => set({ width }),
  setHeight: (height) => set({ height }),
  setAnalysesId: (analysesId) => set({ analysesId }),
  setConfigsSelected: (configsSelected) => set({ configsSelected }),
  setOpen: (open) => set({ open }),
  setParentSelected: (parentSelected) => set({ parentSelected }),
  setPolygonNames: (polygonNames) => set({ polygonNames }),
  setLineNames: (lineNames) => set({ lineNames }),
}));
