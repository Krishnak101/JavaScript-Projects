import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: {},
  reducers: {
    setAlert: (state, action) => {
      return action.payload;
    },
    clearAlert: (state, action) => {
      return {};
    },
  },
});

export const { setAlert, clearAlert } = alertSlice.actions;

export default alertSlice.reducer;
