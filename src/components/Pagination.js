"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import { Button, Typography, Box } from "@mui/material";
import { useTranslations } from "next-intl";

export default function Pagination({ currentPage, totalPages }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = useTheme();
  const t = useTranslations("HomePage");

  const handlePageChange = (newPage) => {
    if (newPage !== currentPage) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", newPage);
      router.push(`?${params.toString()}`);
    }
  };

  const generatePageNumbers = () => {
    const pages = [];

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: { xs: 0.5, sm: 1 },
        mt: 2,
      }}
    >
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        sx={{
          backgroundColor: theme.palette.action.hover,
          color: theme.palette.text.primary,
          "&:hover": {
            backgroundColor: theme.palette.primary.hover,
            color: theme.palette.primary.contrastText,
          },
          fontSize: { xs: "0.5rem", sm: "0.875rem" },
          padding: { xs: "2px 4px", sm: "6px 12px" },
          minWidth: { xs: "28px", sm: "36px" },
        }}
      >
        {t("pagination.previous")}
      </Button>

      {pageNumbers.map((page, index) =>
        page === "..." ? (
          <Typography
            key={`ellipsis-${index}`}
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              marginX: { xs: 0.5, sm: 1 },
              fontSize: { xs: "0.5rem", sm: "0.875rem" },
            }}
          >
            ...
          </Typography>
        ) : (
          <Button
            key={`page-${page}`}
            onClick={() => handlePageChange(page)}
            sx={{
              backgroundColor:
                page === currentPage
                  ? theme.palette.primary.main
                  : theme.palette.background.paper,
              color:
                page === currentPage
                  ? theme.palette.primary.contrastText
                  : theme.palette.text.primary,
              "&:hover": {
                backgroundColor: theme.palette.primary.hover,
                color: theme.palette.primary.contrastText,
              },
              fontSize: { xs: "0.5rem", sm: "0.875rem" },
              padding: { xs: "2px 4px", sm: "6px 12px" },
              minWidth: { xs: "28px", sm: "36px" },
            }}
          >
            {page}
          </Button>
        )
      )}

      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        sx={{
          backgroundColor: theme.palette.action.hover,
          color: theme.palette.text.primary,
          "&:hover": {
            backgroundColor: theme.palette.primary.hover,
            color: theme.palette.primary.contrastText,
          },
          fontSize: { xs: "0.5rem", sm: "0.875rem" },
          padding: { xs: "2px 4px", sm: "6px 12px" },
          minWidth: { xs: "28px", sm: "36px" },
        }}
      >
        {t("pagination.next")}
      </Button>
    </Box>
  );
}
