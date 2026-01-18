import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#0D3B66" },
    secondary: { main: "#F95738" },
    background: {
      default: "#EFF4F7",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1E1E1E",
      secondary: "#555555",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h6: { fontWeight: 600 },
    button: { textTransform: "none" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 20px",
        },
      },
    },
  },
});

export default theme;
