import { createTheme } from "@mui/material/styles";

export const colors = {
  primary: "#f44336",
  secondary: "#11cb5f",
  danger: "#e53e3e",
};

export const theme = createTheme({
  palette: {
    status: {
      danger: colors.danger,
    },
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    mode: "dark",
  },
});
export const { width, height } = window.screen;