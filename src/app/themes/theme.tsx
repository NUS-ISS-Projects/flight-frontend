import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6246ea",
      dark: "#4431a3",
    },
    secondary: {
      main: "##d1d1e9",
    },
    background: {
      default: "#fffffe",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          color: "#fffffe",
          backgroundColor: "#6246ea",
          "&:hover": {
            backgroundColor: "#4431a3",
          },
        },
      },
    },
  },
});

export default theme;
