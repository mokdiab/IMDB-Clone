import { fetchFromAPI } from "./utils/fetching";
import { SearchResults, SearchBar } from "@/components";
import { getLocale } from "next-intl/server";
import { getLanguageWithLocale } from "./utils/utils";

export default async function SearchPage({ searchParams: params }) {
  const searchParams = await params;
  const locale = await getLocale();
  const query = searchParams?.query || "";
  const includeAdult = searchParams?.include_adult === "true";
  const primaryReleaseYear = searchParams?.primary_release_year || null;
  const year = searchParams?.year || null;
  const currentPage = parseInt(searchParams?.page, 10) || 1;
  const language = getLanguageWithLocale(locale);

  if (!query || query.trim() === "") {
    return (
      <div className="align-element my-4">
        <SearchBar />
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-gray-500">
            Please enter a movie name to view results.
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
      <SearchResults data={data} query={query} page={currentPage} />
    </div>
  );
}
