import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPostByID } from '../utils/actions/post';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from './PostCard';
import Spinner from '../Home/Spinner';
import "./Post.css";

const Post = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const post = useSelector((state) => state.postReducer.post);

    useEffect(() => {
        dispatch(getPostByID(id));
    }, []);

    if(post === null){
        return <Spinner/>;
    }
  return (
    <div className='posts_page_container'>
        <Link to="/posts" className='btn_back_posts rounded bg-blue-400 hover:bg-blue-500 hover:shadow-[0_0_10px_rgba(145,145,178,0.6)] '>Back To Posts</Link>
        <PostCard postItem={post}  auth={false} />
    </div>
  )
}

export default Post