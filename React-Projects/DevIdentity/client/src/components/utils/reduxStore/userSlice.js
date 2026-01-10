import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userStore",
  initialState: {
    token: localStorage.getItem("token"),
    user: null,
  },
  reducers: {
    setUserState: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };
    },
    clearUserState: (state, action) => {
      localStorage.removeItem("token");
      return { ...state, token: null, user: null };
    },
  },
});

export const { setUserState, clearUserState } = userSlice.actions;

export default userSlice.reducer;
