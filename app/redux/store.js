import { configureStore } from "@reduxjs/toolkit";
import quoteReducer from "./quoteSlice"

export const store = configureStore({
  reducer: {
    quote: quoteReducer
  }
})
