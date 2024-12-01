"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Box,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";
import { useState } from "react";

const SearchBar = ({ language }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [error, setError] = useState(false);
  const [includeAdult, setIncludeAdult] = useState(
    searchParams.get("include_adult") === "true"
  );
  const [primaryReleaseYear, setPrimaryReleaseYear] = useState(
    searchParams.get("primary_release_year") || ""
  );
  const [year, setYear] = useState(searchParams.get("year") || "");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError(true);
      return;
    }
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    params.set("include_adult", includeAdult);
    if (primaryReleaseYear)
      params.set("primary_release_year", primaryReleaseYear);
    if (year) params.set("year", year);
    params.set("language", language);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <Box
      className="bg-amber-100 dark:bg-gray-600"
      component="form"
      onSubmit={handleSearch}
      sx={{
        padding: 1,
        borderRadius: 1,
        boxShadow: 1,
        marginBottom: 2,
      }}
    >
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            size="small"
            label="Search"
            variant="outlined"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            error={error}
            helperText={error ? "Please enter a movie name" : ""}
          />
        </Grid>

        <Grid item xs={6} sm={2} className="flex items-center justify-center">
          <FormControlLabel
            control={
              <Checkbox
                checked={includeAdult}
                onChange={(e) => setIncludeAdult(e.target.checked)}
                size="small"
              />
            }
            label="Adult"
            sx={{ marginLeft: 0 }}
          />
        </Grid>

        <Grid item xs={6} sm={3}>
          <TextField
            fullWidth
            size="small"
            label="Release Year"
            variant="outlined"
            type="number"
            value={primaryReleaseYear}
            onChange={(e) => setPrimaryReleaseYear(e.target.value)}
          />
        </Grid>

        <Grid item xs={6} sm={2}>
          <TextField
            fullWidth
            size="small"
            label="Year"
            variant="outlined"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </Grid>

        <Grid item xs={6} sm={1}>
          <Button
            type="submit"
            variant="contained"
            size="small"
            color="primary"
            fullWidth
            sx={{ fontSize: "0.75rem", padding: "4px 8px" }}
          >
            Go
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchBar;
