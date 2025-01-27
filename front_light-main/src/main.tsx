import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";
import RouterProvider from "./components/router-provider/index.tsx";
import { Toaster } from "sonner";
import "./utils/i18-next.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider />
    <Toaster theme="light" />
  </React.StrictMode>
);
