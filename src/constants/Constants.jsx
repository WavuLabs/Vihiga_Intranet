import { Slide } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import React from "react";

const styles = {
  root: {
    backgroundColor: "#f4433620",
  },
  col: {
    display: "flex",
    flexDirection: "column",
  },
  mp: {
    margin: "0px 0px",
    padding: "0px 0px",
  },
  border: {
    border: "1px solid black",
  },
};

const colors = {
  primary: "#f44336",
  primaryDark: "#f4433620",
  secondary: "#311B92",
  secondaryLight: "#9C27B0",
  gold: "#1B5E20",
  goldDark: "#FFC107",
  green: "#11cb5f",
};

const theme = createTheme({
  components: {
    // Use `MuiDataGrid` on DataGrid, DataGridPro and DataGridPremium
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: "#f4433620",
        },
      },
    },
    // change default color of TableCell
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: "black",
          textAlign: "center",
        },
        head: {
          color: "black",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "black",
        },
      },
    },
  },
  palette: {
    status: {
      danger: colors.primary,
    },
    primary: {
      main: colors.primary,
      primaryDark: colors.primaryDark,
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
const { width, height } = window.screen;

export const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const departments = [
  "Executive",
  "Transport & Infrastructure",
  "Finance & Economic Planning",
  "Administration and Coordination of County Affairs",
  "Physical Planning, Lands and Housing",
  "Trade, Industry, Tourism and Entrepreneurship",
  "Agriculture, Livestock, Fisheries & Cooperatives",
  "Environment, Water, Energy and Natural Resources",
  "Health Services",
  "Youth, Gender, Sports, Culture and Social Services",
  "Education, Science and Technical Vocational Training",
  "All Departments",
];
const JobTitles = ["Exco", "CECM", "Chief Officer", "Director"];

export { JobTitles, departments, styles, theme, colors, width, height };
