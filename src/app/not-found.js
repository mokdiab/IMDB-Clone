"use client";

import { useTheme } from "@mui/material/styles";
import Link from "next/link";

export default function NotFound() {
  const theme = useTheme();

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <div className="text-center">
        <h1
          className="text-6xl font-bold mb-4"
          style={{ color: theme.palette.primary.main }}
        >
          404
        </h1>
        <p
          className="text-xl mb-6"
          style={{ color: theme.palette.text.secondary }}
        >
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
