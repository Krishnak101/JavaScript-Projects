import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profileStore",
  initialState: {
    profiles: [],
    profile: null,
    repos: [],
    isProfileLoaded: false,
  },
  reducers: {
    setProfiles: (state, action) => {
      state.profiles = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
      state.isProfileLoaded = true;
    },
    clearProfile: (state, action) => {
      state.profile = null;
      state.isProfileLoaded = false;
      state.repos = [];
    },
    setRepos: (state, action) => {
      state.repos = action.payload;
    },
    setIsProfileLoaded: (state, action) => {
      state.isProfileLoaded = action.payload;
    },
  },
});

export const {
  setProfiles,
  setProfile,
  clearProfile,
  setRepos,
  setIsProfileLoaded,
} = profileSlice.actions;
export default profileSlice.reducer;
