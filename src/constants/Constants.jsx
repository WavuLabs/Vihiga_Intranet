import { createTheme } from "@mui/material/styles";

export const colors = {
  primary: "#f44336",
  secondary: "#311B92",
  secondaryLight: "#9C27B0",
  gold: "#1B5E20",
  goldDark: "#FFC107",
  green: "#11cb5f",
};

export const theme = createTheme({
  palette: {
    status: {
      danger: colors.primary,
    },
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
      light: colors.secondaryLight,
    },
    gold: "#1B5E20",
    goldDark: "#FFC107",
    green: "#11cb5f",
    mode: "dark",
  },
});
export const { width, height } = window.screen;
