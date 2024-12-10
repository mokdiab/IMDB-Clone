import MovieCard from "./MovieCard";
import Grid from "@mui/material/Grid2";
function MoviesGrid({ moviesData }) {
  return (
    <Grid container spacing={2}>
      {moviesData.map((movie) => (
        <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
}

export default MoviesGrid;
