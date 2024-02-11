import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6246ea",
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
            backgroundColor: "##6246ea",
          },
        },
      },
    },
  },
});

export default theme;
