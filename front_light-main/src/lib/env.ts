import { z } from "zod";

const envSchema = z.object({
  VITE_BACKEND_API: z.string().url().default(`https://dev.api.dakaai.io`),
  VITE_HISTORY_MAX: z
    .string()
    .transform((v) => {
      return parseInt(v, 10);
    })
    .default(`10000`),
  VITE_MAILSTON_IP: z.string().default(`127.0.0.1`),

  VITE_VIDEO_WS_URL: z
    .string()
    .url()
    .default(`wss://dev.stream.dakaai.io/stream`),
});

export const env = envSchema.parse(import.meta.env);
