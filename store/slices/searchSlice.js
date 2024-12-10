import { fetchFromAPI } from "@/app/utils/fetching";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  searchResults: [],
  searchQuery: "",
  currentPage: 1,
  totalPages: 1,
  includeAdult: false,
  primaryReleaseYear: "",
  year: "",
  status: "idle",
  error: null,
  currentYear: new Date().getFullYear(),
  storedFilters: null,
};

export const fetchSearchResults = createAsyncThunk(
  "search/searchResults",
  async ({ endpoint, language, currentPage, params }, { rejectWithValue }) => {
    try {
      const response = await fetchFromAPI(
        endpoint,
        language,
        currentPage,
        params
      );
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setIncludeAdult: (state, action) => {
      state.includeAdult = action.payload;
    },
    setPrimaryReleaseYear: (state, action) => {
      state.primaryReleaseYear = action.payload;
    },
    setYear: (state, action) => {
      state.year = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setStoredFilters: (state, action) => {
      state.storedFilters = action.payload;
    },
    resetSearchFields: (state) => {
      state.searchQuery = "";
      state.primaryReleaseYear = "";
      state.year = "";
      state.includeAdult = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.searchResults = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch movies";
      });
  },
});

export const {
  setSearchQuery,
  setIncludeAdult,
  setPrimaryReleaseYear,
  setYear,
  setCurrentPage,
  resetSearchFields,
  setStoredFilters,
} = searchSlice.actions;

export default searchSlice.reducer;
