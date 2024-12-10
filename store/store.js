"use client";
import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./slices/movieSlice";
import searchSlice from "./slices/searchSlice";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: {
    movies: movieSlice,
    search: searchSlice,
  },
});
export default function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
