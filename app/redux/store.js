import { configureStore } from "@reduxjs/toolkit";
import quoteReducer from "./quoteSlice"

const store = configureStore({
  reducer: {
    quote: quoteReducer
  }
})

export default store;