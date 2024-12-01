import { fetchFromAPI } from "../utils/fetching";
import { SearchResults, SearchBar } from "@/components";
import { getLocale } from "next-intl/server";
import { getLanguageWithLocale } from "@/utils";

export default async function SearchPage({ searchParams }) {
  const locale = await getLocale();
  const {
    query,
    include_adult,
    primary_release_year,
    year,
    page = 1,
  } = searchParams;
  const language = getLanguageWithLocale(locale);

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

  const data = await fetchFromAPI("search/movie", language, page, {
    query,
    include_adult: include_adult === "true",
    primary_release_year,
    year,
  });

  return (
    <div className="align-element my-4">
      <SearchBar />
      <SearchResults data={data} query={query} page={page} />
    </div>
  );
}
