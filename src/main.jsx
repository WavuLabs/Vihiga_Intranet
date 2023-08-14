import { Router } from "./APIs/RouteStates";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { ContextProvider } from "./APIs/contexts/Context";
import "./styles/index.css";
import "./styles/App.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <ThemeProvider theme={theme}>
//         <ContextProvider>
//           <App />
//         </ContextProvider>
//       </ThemeProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ContextProvider>
        <RouterProvider router={Router} />
      </ContextProvider>
    </LocalizationProvider>
  </React.StrictMode>
);
