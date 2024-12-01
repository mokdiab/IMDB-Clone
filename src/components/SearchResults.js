"use client";

import { useTranslations } from "use-intl";
import { Pagination, HomeGridTranslation } from "@/components";

export default function SearchResults({ data, query, page }) {
  const t = useTranslations("SearchPage");

  if (!data.results || data.results.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-gray-500">{t("noResults", { query })}</p>
      </div>
    );
  }

  return (
    <>
      <HomeGridTranslation data={data.results} />
      <Pagination
        currentPage={parseInt(page, 10)}
        totalPages={data.total_pages}
      />
    </>
  );
}
