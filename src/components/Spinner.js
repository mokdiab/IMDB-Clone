"use client";

import { useTheme } from "@mui/material/styles";
import { useTranslations } from "next-intl";
export default function Spinner() {
  const t = useTranslations("loading");
  const theme = useTheme();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
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
        {t("message")}
      </p>
    </div>
  );
}
