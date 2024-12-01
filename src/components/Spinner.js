"use client";

import { useTheme } from "@mui/material/styles";

export default function Spinner() {
  const theme = useTheme();

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <div
        className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4"
        style={{
          borderColor: theme.palette.primary.main,
          borderBottomColor: "transparent",
        }}
      ></div>
      <p
        className="mt-4 text-lg"
        style={{
          color: theme.palette.text.secondary,
        }}
      >
        Loading, please wait...
      </p>
    </div>
  );
}
