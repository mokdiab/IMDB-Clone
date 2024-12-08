import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  currentPage: 1,
  totalPages: 1,
};

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    initializeMovies: (state, action) => {
      state.movies = action.payload.movies;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { initializeMovies, setCurrentPage } = movieSlice.actions;

export default movieSlice.reducer;
