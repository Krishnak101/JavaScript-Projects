import React, { Fragment, useEffect } from "react";
import { getAllPosts } from "../utils/actions/post";
import { useDispatch } from "react-redux";

const Posts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);
  return <div></div>;
};

export default Posts;
