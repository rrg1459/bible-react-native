import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  currentScreen: "index",
  bookColumns: 6
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
  }
});

export const { changeScreen, changeBookColumns } = quoteSlice.actions;

export default quoteSlice.reducer;
