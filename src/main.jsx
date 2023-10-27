import { Router } from "./APIs/RouteStates";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { ContextProvider } from "./APIs/contexts/Context";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./styles/index.css";
import "./styles/App.css";
import "react-loading-skeleton/dist/skeleton.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ContextProvider>
        <RouterProvider router={Router} />
      </ContextProvider>
    </LocalizationProvider>
  </React.StrictMode>
);
