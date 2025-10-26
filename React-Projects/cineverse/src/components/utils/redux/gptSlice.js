import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    isGptOpen: false,
    gptMovies: [],
  },
  reducers: {
    toggleGptState: (state) => {
      state.isGptOpen = !state.isGptOpen;
    },
    addGPTMovies: (state, action) => {
      state.gptMovies = action.payload;
    },
  },
});

export const { toggleGptState, addGPTMovies } = gptSlice.actions;

export default gptSlice.reducer;
