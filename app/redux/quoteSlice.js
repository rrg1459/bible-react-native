import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  language: 1, // 0: english, 1: spanisch
  currentScreen: "books",
  bookColumns: 6,
  book: {
    id: null,
    testament_id: null,
    type_id: null,
    name: [],
    abbreviation: [],
    chapters: null
  },
  numChapter: null,
  numVerses: [],
  fontSizeVerse: 20,
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
    updateFontSizeVerse: (state, action) => {
      state.fontSizeVerse = action.payload;
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
  updateFontSizeVerse,
 } = quoteSlice.actions;

export default quoteSlice.reducer;
