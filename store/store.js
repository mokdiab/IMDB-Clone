"use client";
import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./slices/movieSlice";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: {
    movie: movieSlice,
  },
});
export default function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
