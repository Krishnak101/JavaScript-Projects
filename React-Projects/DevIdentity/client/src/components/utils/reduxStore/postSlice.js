import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "postStore",
  initialState: {
    posts: [],
    post: null,
    loading: true,
    error: {},
  },
  reducers: {
    getPosts: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    },
    setPost: (state, action) => {
      state.post = action.payload;
      state.loading = false;
    },
    setPostError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearPostError: (state, action) => {
      state.error = {};
      state.loading = false;
    },
  },
});

export const { getPosts, setPost, setPostError, clearPostError } =
  postSlice.actions;

export default postSlice.reducer;
