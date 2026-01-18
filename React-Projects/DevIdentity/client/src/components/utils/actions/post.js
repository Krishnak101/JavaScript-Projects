import axios from "axios";
import { getPosts, setPost, setPostError } from "../reduxStore/postSlice";

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
