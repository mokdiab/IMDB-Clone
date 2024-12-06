import { fetchFromAPI } from "../utils/fetching";
import { Pagination, SearchBar, HomeGridTranslation } from "@/components";
import { useTranslations } from "next-intl";

export default async function SearchPage({ searchParams }) {
  const {
    query,
    include_adult,
    primary_release_year,
    year,
    page = 1,
  } = searchParams;

  const language = "en-US";

  if (!query || query.trim() === "") {
    return (
      <div className="align-element my-4">
        <SearchBar />
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-gray-500">
            Please enter a search query to view results.
          </p>
        </div>
      </div>
    );
  }

  const data = await fetchFromAPI("search/movie", language, currentPage, {
    query,
    include_adult: includeAdult,
    primaryReleaseYear,
    year,
  });

  return (
    <div className="align-element my-4">
      <SearchBar />
      <HomeGridTranslation data={data.results} />
      <Pagination
        currentPage={parseInt(page, 10)}
        totalPages={data.total_pages}
      />
    </div>
  );
}
