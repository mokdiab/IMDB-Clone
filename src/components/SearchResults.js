"use client";

import { useTranslations } from "use-intl";
import { Pagination, MoviesGrid } from "@/components";
import { useSelector } from "react-redux";

export default function SearchResults({ data, query, page }) {
  const t = useTranslations("SearchPage");
  const { totalPages, storedFilters } = useSelector((state) => state.search);
  if (!storedFilters || !data || data.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-gray-500">
          {t("noResults", { query: storedFilters?.query || "" })}
        </p>
      </div>
    );
  } else {
    return (
      <>
        <h2 className="text-2xl font-bold mb-4">
          {t("results", { query: storedFilters?.query })}
        </h2>
        <MoviesGrid moviesData={data} />
        <Pagination currentPage={page} totalPages={totalPages} />
      </>
    );
  }
}
