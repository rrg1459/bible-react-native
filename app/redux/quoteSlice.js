import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  currentScreen: "index",
  bookColumns: 6,
  language: 1 // 0: english, 1: spanisch
};

const quoteSlice = createSlice({
  name: "quote",
  initialState,
  reducers: {
    changeScreen: (state, action) => {
      state.currentScreen = action.payload;
    },
    changeBookColumns: (state, action) => {
      state.bookColumns = action.payload;
    },
    updateLanguage: (state, action) => {
      state.language = action.payload;
    },
  }
});

export const { changeScreen, changeBookColumns, updateLanguage } = quoteSlice.actions;

export default quoteSlice.reducer;
