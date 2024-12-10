"use client";
import {
  Box,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Paper,
  Typography,
} from "@mui/material";
import Link from "next/link";
import debounce from "lodash/debounce";
import Grid from "@mui/material/Grid2";
import { useEffect, useState, useRef, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  setSearchQuery,
  setPrimaryReleaseYear,
  setYear,
  setIncludeAdult,
  fetchSearchResults,
  resetSearchFields,
  setStoredFilters,
} from "../../../store/slices/searchSlice";
import Image from "next/image";

const SearchBar = ({ language }) => {
  const t = useTranslations("SearchPage");
  const dispatch = useDispatch();
  const { searchQuery, primaryReleaseYear, year, includeAdult, currentYear } =
    useSelector((state) => state.search);
  const router = useRouter();
  const searchRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [errors, setErrors] = useState({
    query: false,
    primaryReleaseYear: false,
    year: false,
  });

  // Debounced fetch function with memoization
  const debouncedFetch = useMemo(
    () =>
      debounce(async (value) => {
        if (!value.trim()) {
          setShowSuggestions(false);
          setSuggestions([]);
          return;
        }

        try {
          const { results } = await dispatch(
            fetchSearchResults({
              endpoint: "/search/movie",
              language,
              currentPage: 1,
              params: {
                query: value,
                include_adult: includeAdult,
                year,
                primary_release_year: primaryReleaseYear,
              },
            })
          ).unwrap();

          setShowSuggestions(true);
          setSuggestions(results.slice(0, 6));
        } catch (e) {
          console.error("Failed to fetch movies:", e);
          setSuggestions([]);
          setShowSuggestions(false);
        }
      }, 300),
    [dispatch, language, includeAdult, primaryReleaseYear, year]
  );

  // Fetch suggestions when search query changes
  useEffect(() => {
    if (searchQuery.length > 1) {
      debouncedFetch(searchQuery);
    }
  }, [searchQuery, debouncedFetch]);

  // Cleanup on unmount
  useEffect(() => {
    return () => debouncedFetch.cancel();
  }, [debouncedFetch]);

  // Handle input change for search suggestions
  const handleSearchSuggestion = (e) => {
    const value = e.target.value;
    dispatch(setSearchQuery(value));

    if (value.length > 1) {
      debouncedFetch(value);
    } else {
      debouncedFetch.cancel();
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };
  const handleSuggestionClick = () => {
    setShowSuggestions(false);
    setSuggestions([]);
    dispatch(setSearchQuery(""));
  };
  // Handle form submission for search
  const handleSearch = (e) => {
    e.preventDefault();
    setErrors({ query: false, primaryReleaseYear: false, year: false });

    let hasError = false;

    if (!searchQuery.trim()) {
      setErrors((prev) => ({ ...prev, query: true }));
      hasError = true;
    }

    if (
      primaryReleaseYear &&
      (primaryReleaseYear < 1900 || primaryReleaseYear > currentYear)
    ) {
      setErrors((prev) => ({ ...prev, primaryReleaseYear: true }));
      hasError = true;
    }

    if (year && (year < 1900 || year > currentYear)) {
      setErrors((prev) => ({ ...prev, year: true }));
      hasError = true;
    }

    if (hasError) return;
    dispatch(
      setStoredFilters({
        query: searchQuery,
        includeAdult,
        primaryReleaseYear,
        year,
      })
    );
    router.push("/search");
    setSuggestions([]);
    setShowSuggestions(false);
    dispatch(resetSearchFields());
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box
      ref={searchRef}
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
        <Grid size={{ xs: 12, sm: 4 }} position={"relative"}>
          <TextField
            fullWidth
            size="small"
            label={t("searchTerm")}
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchSuggestion}
            error={errors.query}
            helperText={errors.query ? t("movieNameValidation") : ""}
          />
          {showSuggestions && (
            <Paper
              elevation={3}
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "100%",
                mt: 1,
                zIndex: 10,
                borderRadius: 2,
                overflow: "hidden",
                padding: 1,
                backgroundColor: "background.paper",
              }}
            >
              <Grid container spacing={1}>
                {suggestions.length > 0 ? (
                  suggestions.map((movie) => (
                    <Grid
                      item
                      size={{ xs: 12, sm: 12, md: 6, lg: 4 }}
                      key={movie.id}
                      className="flex items-center"
                    >
                      <Link
                        href={`/movie/${movie.id}`}
                        className="flex w-full sm:flex-col gap-2 hover:scale-105 hover:bg-amber-100 dark:hover:bg-gray-700 p-2 rounded transition duration-200"
                        onClick={handleSuggestionClick}
                      >
                        <div className="relative w-16 h-12 sm:w-full sm:h-32 flex-shrink-0">
                          <Image
                            src={
                              movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                : "/fallback.jpg"
                            }
                            alt={movie.title}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="flex flex-col justify-center overflow-hidden">
                          <Typography
                            variant="body1"
                            className="font-bold text-gray-800 dark:text-gray-200 truncate"
                          >
                            {movie.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            className="text-gray-500 dark:text-gray-400"
                          >
                            {movie.release_date}
                          </Typography>
                        </div>
                      </Link>
                    </Grid>
                  ))
                ) : (
                  <Grid xs={12}>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      className="text-center py-4"
                    >
                      {t("noResults", { query: searchQuery })}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Paper>
          )}
        </Grid>

        <Grid
          size={{ xs: 6, sm: 2 }}
          className="flex items-center justify-center"
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={includeAdult}
                onChange={(e) => dispatch(setIncludeAdult(e.target.checked))}
                size="small"
              />
            }
            label={t("adult")}
            sx={{ marginLeft: 0 }}
          />
        </Grid>

        <Grid size={{ xs: 6, sm: 3 }}>
          <TextField
            fullWidth
            size="small"
            label={t("primaryReleaseYear")}
            variant="outlined"
            type="number"
            value={primaryReleaseYear}
            onChange={(e) => dispatch(setPrimaryReleaseYear(e.target.value))}
            helperText={
              errors.primaryReleaseYear
                ? t("primaryReleaseYearValidation", {
                    min: 1900,
                    max: currentYear,
                  })
                : ""
            }
            error={errors.primaryReleaseYear}
          />
        </Grid>

        <Grid size={{ xs: 6, sm: 2 }}>
          <TextField
            fullWidth
            size="small"
            label={t("year")}
            variant="outlined"
            type="number"
            value={year}
            onChange={(e) => dispatch(setYear(e.target.value))}
            helperText={
              errors.year
                ? t("yearValidation", { min: 1900, max: currentYear })
                : ""
            }
            error={errors.year}
          />
        </Grid>

        <Grid size={{ xs: 6, sm: 1 }}>
          <Button
            type="submit"
            variant="contained"
            size="small"
            color="primary"
            fullWidth
            sx={{ fontSize: "0.75rem", padding: "4px 8px" }}
          >
            {t("searchTerm")}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchBar;
