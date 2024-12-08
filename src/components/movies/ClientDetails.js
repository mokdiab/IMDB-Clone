"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Typography,
  Button,
  Chip,
  Card,
  CardContent,
  Box,
} from "@mui/material";

export default function ClientDetails({ movie, locale }) {
  const t = useTranslations("DetailsPage");

  const {
    title,
    tagline,
    backdrop_path,
    poster_path,
    overview,
    genres,
    release_date,
    runtime,
    vote_average,
    vote_count,
    budget,
    revenue,
    homepage,
    production_companies,
  } = movie;

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatCurrency = (value, locale) => {
    if (typeof window === "undefined") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);
    }
    return new Intl.NumberFormat(locale || "en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };
  return (
    <div className="min-h-screen">
      <div
        className="bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
        }}
      >
        <div className="h-full py-14 bg-white bg-opacity-60 dark:bg-black dark:bg-opacity-60 flex items-center">
          <div className="container mx-auto px-6 flex flex-col md:flex-row gap-8">
            <div className="flex justify-center md:justify-start w-full md:w-auto">
              <div className="relative w-[300px] md:w-[350px] h-[450px] md:h-[450px]">
                <Image
                  src={
                    poster_path
                      ? `https://image.tmdb.org/t/p/w500${poster_path}`
                      : "/fallback.jpg"
                  }
                  alt={title}
                  className="rounded-lg shadow-lg object-cover"
                  fill
                />
              </div>
            </div>
            <div>
              <Typography variant="h3" className="font-bold">
                {title}
              </Typography>
              <Typography
                variant="subtitle1"
                className="italic dark:text-gray-300"
              >
                {tagline}
              </Typography>
              <div className="mt-2 md:mt-6">
                <div className="border-t-2 border-amber-500 mb-4"></div>
                <Typography
                  variant="body1"
                  className="p-4 bg-gray-100 rounded-lg shadow-md text-gray-800 leading-relaxed dark:bg-transparent dark:shadow-none dark:text-gray-300"
                >
                  {overview.split(" ").map((word, i) =>
                    ["horrifying", "fame", "control"].includes(
                      word.toLowerCase()
                    ) ? (
                      <span key={i} className="text-blue-500 font-semibold">
                        {word}{" "}
                      </span>
                    ) : (
                      word + " "
                    )
                  )}
                </Typography>
              </div>

              <div className="my-4">
                <Typography variant="body2" component="div">
                  <strong>{t("genres")}: </strong>
                  {genres.map((genre) => (
                    <Chip
                      key={genre.id}
                      label={genre.name}
                      sx={{
                        backgroundColor: "#fef3c7",
                        color: "black",
                        ":hover": {
                          backgroundColor: "#fcd34d",
                        },
                      }}
                      className="mr-2 mb-2 dark:bg-gray-700 dark:shadow-md dark:shadow-gray-500 dark:text-white dark:hover:bg-gray-500"
                    />
                  ))}
                </Typography>
                <Typography variant="body2">
                  <strong>{t("releaseDate")}:</strong>{" "}
                  {new Date(release_date).toDateString()}
                </Typography>
                <Typography variant="body2">
                  <strong>{t("runtime")}:</strong> {formatRuntime(runtime)}
                </Typography>
                <Typography variant="body2">
                  <strong>{t("rating")}:</strong> {vote_average.toFixed(1)} (
                  {vote_count} {t("votes")})
                </Typography>
              </div>
              {homepage && (
                <Button
                  variant="contained"
                  color="primary"
                  href={homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4"
                >
                  {t("visitHomepage")}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        <Box className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Financials */}
          <Card className=" dark:bg-gray-700 dark:shadow-sm dark:shadow-gray-500">
            <CardContent>
              <Typography variant="h5" className="mb-4">
                {t("financials")}
              </Typography>
              <Typography variant="body2">
                <strong>{t("budget")}:</strong> {formatCurrency(budget, locale)}
              </Typography>
              <Typography variant="body2">
                <strong>{t("revenue")}:</strong>{" "}
                {formatCurrency(revenue, locale)}
              </Typography>
            </CardContent>
          </Card>

          <Card className="  dark:bg-gray-700 dark:shadow-sm dark:shadow-gray-500">
            <CardContent>
              <Typography variant="h5" className="mb-4">
                {t("productionCompanies")}
              </Typography>
              {production_companies.map((company) => (
                <div
                  key={company.id}
                  className="flex items-center gap-4 mb-4 last:mb-0"
                >
                  <Image
                    src={
                      company.logo_path
                        ? `https://image.tmdb.org/t/p/w200${company.logo_path}`
                        : "/fallback.jpg"
                    }
                    alt={company.name}
                    width={50}
                    height={50}
                    className="rounded-lg bg-white p-1"
                  />

                  <Typography variant="body2">{company.name}</Typography>
                </div>
              ))}
            </CardContent>
          </Card>
        </Box>
      </div>
    </div>
  );
}
