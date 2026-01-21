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
    updateLikes: (state, action) => {
      const index = state.posts.findIndex( post => post._id === action.payload.postId);
      if(index !==-1){
        state.posts[index].likes = action.payload.likes;
      }

      // 2. Update the single post (for the Post Detail/Discussion page)
      if (state.post && state.post._id === action.payload.postId) {
        state.post.likes = action.payload.likes;
      }
      state.loading = false;
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter( post => post._id !== action.payload);
      state.loading = false;
    },
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
      state.loading = false;
    },
  },
});

export const { getPosts, setPost, setPostError, clearPostError, updateLikes, deletePost, addPost } =
  postSlice.actions;

export default postSlice.reducer;
