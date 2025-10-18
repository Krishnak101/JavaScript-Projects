import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    isGptOpen: false,
  },
  reducers: {
    toggleGptState: (state) => {
      state.isGptOpen = !state.isGptOpen;
    },
  },
});

export const { toggleGptState } = gptSlice.actions;

export default gptSlice.reducer;
