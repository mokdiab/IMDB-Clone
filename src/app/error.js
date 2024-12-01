"use client";

import { useTheme } from "@mui/material/styles";
import Link from "next/link";

export default function ErrorPage({ error, reset }) {
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
          className="text-4xl font-bold"
          style={{ color: theme.palette.primary.main }}
        >
          Something went wrong!
        </h1>
        <p
          className="text-lg mt-4"
          style={{ color: theme.palette.text.secondary }}
        >
          {error?.message || "An unexpected error occurred."}
        </p>
        <div className="mt-6 space-x-4">
          <button
            onClick={() => reset()} // Reset the error boundary
            className="px-6 py-2 rounded-lg text-lg font-medium"
            style={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            }}
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-2 rounded-lg text-lg font-medium"
            style={{
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.secondary.contrastText,
            }}
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
