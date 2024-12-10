"use client";
import { SearchResults, SearchBar } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResults } from "../../../store/slices/searchSlice";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
export default function SearchPage({ searchParams: params }) {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const {
    searchResults,
    storedFilters,
    includeAdult,
    primaryReleaseYear,
    year,
  } = useSelector((state) => state.search);

  useEffect(() => {
    dispatch(
      fetchSearchResults({
        endpoint: "/search/movie",
        currentPage,
        params: {
          query: storedFilters?.query,
          include_adult: includeAdult,
          year,
          primary_release_year: primaryReleaseYear,
        },
      })
    );
  }, [
    storedFilters?.query,
    currentPage,
    includeAdult,
    primaryReleaseYear,
    year,
    dispatch,
  ]);
  let content;
  if (!storedFilters?.query || storedFilters?.query.trim() === "") {
    content = (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-gray-500">
          Please enter a movie name to view results.
        </p>
      </div>
    );
  } else {
    content = (
      <SearchResults
        data={searchResults}
        query={storedFilters.query}
        page={currentPage}
      />
    );
  }

  return (
    <div className="align-element my-4">
      <SearchBar />
      {content}
    </div>
  );
}
