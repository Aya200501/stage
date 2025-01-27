import { io } from "socket.io-client";
import { env } from "./env";

// "undefined" means the URL will be computed from the `window.location` object
const URL = env.VITE_VIDEO_WS_URL;

export const socket = io(URL);
