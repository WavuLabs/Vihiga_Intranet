import { createTheme } from "@mui/material/styles";

export const styles = {
  root: {
    backgroundColor: "#f4433620",
  },
  col: {
    display: "flex",
    flexDirection: "column",
  },
  mp: {
    margin: '0px 0px',
    padding: '0px 0px',
  },
  border : {
    border: '1px solid black',
  },
};

export const colors = {
  primary: "#f44336",
  primaryDark: "#f4433620",
  secondary: "#311B92",
  secondaryLight: "#9C27B0",
  gold: "#1B5E20",
  goldDark: "#FFC107",
  green: "#11cb5f",
};

export const theme = createTheme({
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
          textAlign: 'center',
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
export const { width, height } = window.screen;
