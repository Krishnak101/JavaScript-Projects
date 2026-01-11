import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import alertReducer from "./alertSlice.js";
import profileReducer from "./profileSlice.js";

const store = configureStore({
  reducer: {
    // Add your reducers here
    user: userReducer,
    alert: alertReducer,
    profile: profileReducer,
  },
});

export default store;
