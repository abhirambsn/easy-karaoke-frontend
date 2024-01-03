import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { RecoilRoot } from "recoil";
import { Toaster } from "@/components/ui/sonner";

import "./index.css";
import HomePage from "@/pages/Home";
import Player from "./pages/Player";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/track/:songId",
    element: <Player />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RecoilRoot>
        <Toaster />
        <RouterProvider router={router} />
      </RecoilRoot>
    </ThemeProvider>
  </React.StrictMode>
);
