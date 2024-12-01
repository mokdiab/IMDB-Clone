import { HomeGridTranslation, SearchBar, Pagination } from "@/components";
import { getLocale } from "next-intl/server";
import { fetchFromAPI } from "./utils/fetching";

export async function generateMetadata() {
  const locale = await getLocale();
  const titles = {
    en: "IMDB Clone",
    ar: "موقع IMDB",
    fr: "Clone IMDB",
  };
  const descriptions = {
    en: "This is a movie site",
    ar: "هذا موقع أفلام",
    fr: "Ceci est un موقع أفلام site",
  };

  return {
    title: titles[locale] || "IMDB Clone",
    description: descriptions[locale] || "This is a movie site",
  };
}

export default async function Home({ searchParams }) {
  const locale = await getLocale();
  const language = `${locale}-${locale.toUpperCase()}`;
  const genre = searchParams.genre || "fetchTrending";
  const category =
    genre === "topRated" ? "movie/top_rated" : "trending/movie/week";

  const currentPage = parseInt(searchParams.page, 10) || 1;
  const data = await fetchFromAPI(category, language, currentPage);

  return (
    <div className="align-element my-4">
      <SearchBar language={language} />
      <HomeGridTranslation data={data.results || []} />
      <Pagination currentPage={currentPage} totalPages={data.total_pages} />
    </div>
  );
}
