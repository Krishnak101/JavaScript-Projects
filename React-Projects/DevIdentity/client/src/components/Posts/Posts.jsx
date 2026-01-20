import React, { Fragment, useEffect } from "react";
import { getAllPosts } from "../utils/actions/post";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Home/Spinner";
import PostCard from "./PostCard";
import { fetchUserData } from "../utils/actions/auth";
import "./Posts.css";
import PostForm from "./PostForm";

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, post, loading } = useSelector((state) => state.postReducer);
  const userReducer = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(fetchUserData());
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="posts_page_container">
      <div className="post_page_headers">
        <h1 className="text-white text-2xl font-bold mb-12 ml-4">Posts</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome to the community
        </p>
      </div>
      <PostForm/>
      {posts.map((postItem) => (
        <PostCard postItem={postItem} key={postItem._id} auth={userReducer} />
      ))}
    </div>
  );
};

export default Posts;
