import { createSlice } from "@reduxjs/toolkit";
import { setAuthToken } from "../helper";

const token = localStorage.getItem("token");
if (token) {
  setAuthToken(token);
}
const userSlice = createSlice({
  name: "userStore",
  initialState: {
    token: token,
    user: null,
  },
  reducers: {
    setUserState: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };
    },
    clearUserState: (state, action) => {
      localStorage.removeItem("token");
      setAuthToken(null);
      return { ...state, token: null, user: null };
    },
    setUserData: (state, action) => {
      return { ...state, user: action.payload };
    },
  },
});

export const { setUserState, clearUserState, setUserData } = userSlice.actions;

export default userSlice.reducer;
