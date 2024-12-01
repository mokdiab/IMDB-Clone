import { fetchFromAPI } from "@/app/utils/fetching";
import { getLocale } from "next-intl/server";
import { MovieDetails } from "@/components";

export default async function MovieDetailsPage({ params }) {
  const { movieslug: id } = params;

  const locale = await getLocale();
  const language = `${locale}-${locale.toUpperCase()}`;

  const movie = await fetchFromAPI(`movie/${id}`, language);

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl text-red-500">Movie not found</h1>
      </div>
    );
  }

  return <MovieDetails movie={movie} />;
}
