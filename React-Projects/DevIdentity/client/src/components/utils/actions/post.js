import axios from "axios";
import { getPosts, setPost, setPostError, updateLikes, deletePost, addPost } from "../reduxStore/postSlice";
import { setAlertWithTimeOut } from "./alerts";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getAllPosts = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/posts");
    dispatch(getPosts(response.data));
  } catch (error) {
    console.error("Error:: getAllPosts() : ",error);
    dispatch(
      setAlertWithTimeOut(error?.response?.data?.msg, "danger"),
    );
  }
};

export const likeOrUnlikePost = (type, postId) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/posts/${type}/${postId}`);
  dispatch(updateLikes({postId, likes: response.data}));
  } catch (error) {
    console.error("Error:: likeOrUnlikePost() : ",error.response);
    dispatch(
      setAlertWithTimeOut(error.response.data.msg, "danger"),
    );
  }
};

export const delete_Post = ( postId) => async (dispatch) => {
  try {
    const response = await axios.delete(`/api/posts/${postId}`);
  dispatch(deletePost(postId));
  dispatch(
      setAlertWithTimeOut("Post Removed", "success"),
    );
  } catch (error) {
    console.error("Error:: likeOrUnlikePost() : ",error.response);
    dispatch(
      setAlertWithTimeOut(error.response.data?.msg, "danger"),
    );
  }
};

export const add_Post = (formData) => async (dispatch) => {
    try {
      const body = JSON.stringify(formData);
      const response = await axios.post("/api/posts", body, config);

      dispatch(addPost(response.data));
      dispatch(setAlertWithTimeOut("Post Created Successfully", "success"));
    } catch (error) {

      console.error("Error :: add_Post() : ", error);
      dispatch(setAlertWithTimeOut(error.response?.data?.msg, "danger"));
    }
  };
