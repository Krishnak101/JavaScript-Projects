import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import alertReducer from "./alertSlice.js";

const store = configureStore({
  reducer: {
    // Add your reducers here
    user: userReducer,
    alert: alertReducer,
  },
});

export default store;
