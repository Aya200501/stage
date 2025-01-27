import { z } from "zod";


export const AddCameraSchema = z.object({
  cameraName: z
    .string()
    .min(3, "the camera name must be at least 3 characters long"),
  description: z.string().optional(),
  mark: z
    .string()
    .min(3, "The reference must be at least 3 characters long"),
  model: z.string().min(3, "The model must be at least 3 characters long"),
  region: z.string().min(3, "You must select a region"),
  city: z.string().min(3, "You must select a city"),
  site: z.string().min(3, "You must select a site"),
  area: z.string().optional(),
  cameraType: z.string().min(3, "You must select a camera type"),
  position: z.object({
    lat: z.number().or(z.null()),
    lng: z.number().or(z.null()),
  }).refine((data) => {
    return data.lat !== null && data.lng !== null;
  }, {
    message: "You must select a position",
  }),
  rtspLink: z.string().min(3, "The RTSP link must be at least 3 characters long"),
  rtspLinkLocal: z.string().optional(),
  username: z.string().min(3, "The username must be at least 3 characters long"),
  password: z.string().min(3, "The password must be at least 3 characters long"),
  httpPort: z.string().min(3, "The HTTP port must be at least 3 characters long"),
  onvifPort: z.string().min(3, "The ONVIF port must be at least 3 characters long"),
  ipAddress: z.string().min(3, "The IP address must be at least 3 characters long"),
  rtspPort: z.string().min(3, "The RTSP port must be at least 3 characters long"),
});

export type AddCameraType = z.infer<typeof AddCameraSchema>;

export const AddCameraDefaultValues = {
  cameraName: "",
  description: "",
  mark: "",
  model: "",
  region: "",
  city: "",
  site: "",
  area: "",
  cameraType: "",
  position: {
    lat: null,
    lng: null,
  },
  rtspLink: "",
  rtspLinkLocal: "",
  username: "",
  password: "",
  httpPort: "",
  onvifPort: "",
  ipAddress: "",
  rtspPort: "",
};


export const CameraConfigSchema = z.object({
  analysesIdSelected: z.array(z.string()).optional(),
});

export type CameraConfigType = z.infer<typeof CameraConfigSchema>;

export const CameraConfigDefaultValues = {
  analysesIdSelected: [],
};