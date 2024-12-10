import { fetchFromAPI } from "@/app/utils/fetching";

import { Typography } from "@mui/material";

import Pagination from "../Pagination";
import MoviesGrid from "./MoviesGrid";

export default async function MovieList({ endpoint, language, currentPage }) {
  let moviesData = { results: [], total_pages: 1 };

  try {
    moviesData = await fetchFromAPI(endpoint, language, currentPage);
  } catch (error) {
    throw new Error("Failed to fetch movies", error);
  }

  return (
    <div>
      {moviesData.results.length === 0 ? (
        <Typography color="error">No movies found.</Typography>
      ) : (
        <MoviesGrid moviesData={moviesData.results} />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={moviesData.total_pages}
      />
    </div>
  );
}
