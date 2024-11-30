import { configureStore } from "@reduxjs/toolkit";
import quoteReducer from "./quoteSlice"

export const store = configureStore({
  reducer: {
    quote: quoteReducer
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
