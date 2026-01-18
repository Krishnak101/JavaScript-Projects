import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import alertReducer from "./alertSlice.js";
import profileReducer from "./profileSlice.js";
import postReducer from "./postSlice.js";

const store = configureStore({
  reducer: {
    // Add your reducers here
    user: userReducer,
    alert: alertReducer,
    profile: profileReducer,
    posts: postReducer,
  },
});

export default store;
