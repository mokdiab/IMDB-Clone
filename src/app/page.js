import { SearchBar, MovieList, Spinner } from "@/components";
import { getLocale } from "next-intl/server";
import { getLanguageWithLocale } from "./utils/utils";
import { Suspense } from "react";

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

export default async function Home({ searchParams: params }) {
  const locale = await getLocale();
  const language = getLanguageWithLocale(locale);
  const searchParams = await params;
  const genre = searchParams?.genre || "fetchTrending";
  const endpoint =
    genre === "topRated" ? "movie/top_rated" : "trending/movie/week";

  const currentPage = parseInt(searchParams.page, 10) || 1;

  return (
    <div className="align-element my-4">
      <SearchBar language={language} />
      <Suspense fallback={<Spinner />}>
        <MovieList
          endpoint={endpoint}
          language={language}
          currentPage={currentPage}
        />
      </Suspense>
    </div>
  );
}
