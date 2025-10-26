import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    isGptOpen: false,
    gptMovieNames: [],
    gptResults: [],
  },
  reducers: {
    toggleGptState: (state) => {
      state.isGptOpen = !state.isGptOpen;
    },
    addGPTMovies: (state, action) => {
      const { gptMovieNames, gptResults } = action.payload;
      state.gptMovieNames = gptMovieNames;
      state.gptResults = gptResults;
    },
  },
});

export const { toggleGptState, addGPTMovies } = gptSlice.actions;

export default gptSlice.reducer;
