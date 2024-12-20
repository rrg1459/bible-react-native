import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  language: 1, // 0: english, 1: spanisch
  currentScreen: "books",
  bookColumns: 3,
  chapterColumns: 5,
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
  type_id: 11,
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
    changeChapterColumns: (state, action) => {
      state.chapterColumns = action.payload;
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
    changeType: (state, action) => {
      state.type_id = action.payload;
    },
  }
});

export const {
  changeScreen,
  changeBookColumns,
  changeChapterColumns,
  updateLanguage,
  updateBook,
  updateChapter,
  updateVerses,
  updateFontSizeVerse,
  changeType
 } = quoteSlice.actions;

export default quoteSlice.reducer;
