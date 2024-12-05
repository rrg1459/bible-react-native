import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  language: 1, // 0: english, 1: spanisch
  currentScreen: "index",
  bookColumns: 6,
  book: {
    id: null,
    testament_id: null,
    type_id: null,
    label: [],
    abbreviation: [],
    chapters: null
  },
  numChapter: null,
  numVerses: [],
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
    updateBook: (state, action) => {
      state.book = action.payload;
    },
    updateChapter: (state, action) => {
      state.numChapter = action.payload;
    },
    updateVerses: (state, action) => {
      state.numVerses = action.payload;
    },
  }
});

export const {
  changeScreen,
  changeBookColumns,
  updateLanguage,
  updateBook,
  updateChapter,
  updateVerses,
 } = quoteSlice.actions;

export default quoteSlice.reducer;
