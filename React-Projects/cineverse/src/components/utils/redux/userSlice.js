import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUserState: (state, action) => {
      return action.payload;
    },
    clearUserState: () => {
      return null;
    },
  },
});

export const { setUserState, clearUserState } = userSlice.actions;

export default userSlice.reducer;
