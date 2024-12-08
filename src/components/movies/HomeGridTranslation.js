import Image from "next/image";
import Link from "next/link";
import { MdOutlineStarRate } from "react-icons/md";

export default function HomeGridTranslation({ data }) {
  return (
    <div className="mt-10">
      <div className="grid md:grid-cols-4 gap-4">
        {data.map((movie) => (
          <Link
            href={`/movie/${movie.id}`}
            key={movie.id}
            className="group flex flex-col pb-2 h-96 hover:scale-105 sm:shadow-md hover:shadow-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 ease-in-out"
          >
            <div
              key={movie.id}
              className="relative w-full h-72 overflow-hidden"
            >
              <Image
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/fallback.jpg"
                }
                alt={movie.title}
                fill
                className="group-hover:opacity-80 duration-300 transition-opacity"
                placeholder="blur"
                blurDataURL="/Spinner.svg"
              />
            </div>
            <div className="flex flex-col gap-1 px-4 py-2">
              <h3 className="text-lg font-bold">{movie.title}</h3>
              <div className="flex justify-between items-center">
                <h6 className="text-sm">{movie.release_date}</h6>
                <h6 className="text-sm flex items-center">
                  <MdOutlineStarRate /> {movie.vote_average.toFixed(1)}
                </h6>
              </div>
              <p className="text-xs line-clamp-2">{movie.overview} ...</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
