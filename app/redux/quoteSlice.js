import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface QuoteSlice {
//   currentScreen: String;
// }

const initialState = {
  currentScreen: "index"
};

const quoteSlice = createSlice({
  name: "quote",
  initialState,
  reducers: {
    changeScreen: (state, action) => {
      state.currentScreen = action.payload;
    },

  }
});

export const { changeScreen } = quoteSlice.actions;

export default quoteSlice.reducer;
