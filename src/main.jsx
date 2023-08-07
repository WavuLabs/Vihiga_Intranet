import { Router } from "./APIs/RouteStates";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { ContextProvider } from "./APIs/contexts/Context";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./constants/Constants";
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ContextProvider>
        <RouterProvider router={Router} />
      </ContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
