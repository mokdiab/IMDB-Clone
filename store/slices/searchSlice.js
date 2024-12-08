import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  searchResults: [],
  searchQuery: "",
  currentPage: 1,
  totalPages: 1,
  includeAdult: false,
  primaryReleaseYear: null,
  year: null,
};
