import axios from "axios";
import { getPosts, setPost, setPostError, updateLikes } from "../reduxStore/postSlice";
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
    dispatch(
      setPostError({
        msg: error.response.statusText,
        status: error.response.status,
      }),
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
