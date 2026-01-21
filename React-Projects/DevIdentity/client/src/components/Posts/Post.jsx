import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPostByID } from '../utils/actions/post';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from './PostCard';
import Spinner from '../Home/Spinner';
import "./Post.css";
import Comment from './Comment';
import PostForm from './PostForm';

const Post = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const post = useSelector((state) => state.postReducer.post);
    const [text, setText] = useState("");
    const submitForm = (e) =>{
        e.preventDefault();
        dispatch(add_Post({"text":text}));
        setText(""); // Clear the Form
    }
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
            <h2 className='text_comments_header font-bold text-2xl'>Comments</h2>
            <form className='post_form bg-gray-200' onSubmit={(e)  => submitForm(e)}>
            <textarea name="text" cols="30" rows="2" placeholder='Add a Comment' value={text} onChange={e => setText(e.target.value)} required className='post_form_text bg-gray-100'></textarea>
            <button type='submit' className='btn_submit_post' >Submit</button>
        </form>
        <div className='comments_container'>
            {post.comments.map((comment) => <Comment key={comment._id} comment={comment}/>)}
        </div>
    </div>
  )
}

export default Post