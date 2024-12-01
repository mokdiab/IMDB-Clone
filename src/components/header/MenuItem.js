"use client";
import { useTheme } from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
const MenuItem = ({ address, title, param, children }) => {
  const theme = useTheme();
  const searchParams = useSearchParams();
  const genre = searchParams.get("genre") || "trending";
  return (
    <Link
      href={param ? `/?genre=${param}` : address}
      className={`${
        genre === param
          ? "underline underline-offset-8 decoration-4 decoration-amber-400"
          : ""
      }`}
      style={{
        color: theme.palette.text.primary,
        transition: "color 0.3s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.color = theme.palette.primary.main)
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.color = theme.palette.text.primary)
      }
    >
      {title}
    </Link>
  );
};

export default MenuItem;
