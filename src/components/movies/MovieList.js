import { fetchFromAPI } from "@/app/utils/fetching";
import MovieCard from "./MovieCard";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Pagination from "../Pagination";

export default async function MovieList({ endpoint, language, currentPage }) {
  let moviesData = { results: [], total_pages: 1 };

  try {
    moviesData = await fetchFromAPI(endpoint, language, currentPage);
  } catch (error) {
    throw new Error(error);
  }

  return (
    <div>
      {moviesData.results.length === 0 ? (
        <Typography color="error">No movies found.</Typography>
      ) : (
        <Grid container spacing={2}>
          {moviesData.results.map((movie) => (
            <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={moviesData.total_pages}
      />
    </div>
  );
}
