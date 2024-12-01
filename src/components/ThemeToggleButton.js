"use client";

import { useThemeMode } from "../components/ThemeContext";
import IconButton from "@mui/material/IconButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function ThemeToggleButton() {
  const { toggleTheme, mode } = useThemeMode();

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
}
