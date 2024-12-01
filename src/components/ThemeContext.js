"use client";
import { createContext, useState, useMemo, useContext, useEffect } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme, darkTheme } from "./theme";

const ThemeModeContext = createContext();

export function ThemeModeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  useEffect(() => {
    localStorage.setItem("theme", mode);
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  const theme = useMemo(
    () => (mode === "light" ? lightTheme : darkTheme),
    [mode]
  );
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeModeContext.Provider value={{ toggleTheme, mode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeModeContext.Provider>
  );
}
export function useThemeMode() {
  return useContext(ThemeModeContext);
}
