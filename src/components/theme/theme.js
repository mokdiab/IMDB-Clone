// src/theme.js
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ffaf1c",
      contrastText: "#000000",
      hover: "#e09c17",
    },
    secondary: {
      main: "#90caf9",
      contrastText: "#000000",
      hover: "#7abcf0",
    },
    background: {
      default: "#ffffff",
      paper: "#f4f4f4",
    },
    text: {
      primary: "#000000",
      secondary: "#5f6368",
    },
    action: {
      hover: "#f7f7f7",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffaf1c",
      contrastText: "#ffffff",
      hover: "#e09c17",
    },
    secondary: {
      main: "#90caf9",
      contrastText: "#ffffff",
      hover: "#7abcf0",
    },
    background: {
      default: "#404b5a",
      paper: "#1c1c1c",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
    action: {
      hover: "#303841",
    },
  },
});
