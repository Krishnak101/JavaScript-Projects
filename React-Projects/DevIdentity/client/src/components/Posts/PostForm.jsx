import React, { useState } from 'react';
import "./PostForm.css";
import { useDispatch } from 'react-redux';
import { add_Post } from '../utils/actions/post';

const PostForm = () => {
const dispatch = useDispatch();
    const [text, setText] = useState("");
    const submitForm = (e) =>{
        e.preventDefault();
        dispatch(add_Post({"text":text}));
        setText(""); // Clear the Form
    }
  return (
    <div className='post_form_container'>
        <div className='bg_primary bg-gradient-to-r from-gray-800 to-gray-700'>
            <h3> Say Something...</h3>
        </div>
        <form className='post_form bg-gray-200' onSubmit={(e)  => submitForm(e)}>
            <textarea name="text" cols="30" rows="5" placeholder='Create a Post' value={text} onChange={e => setText(e.target.value)} required className='post_text bg-gray-100'></textarea>
            <button type='submit' className='btn_submit_post' >Submit</button>
        </form>
    </div>
  )
}

export default PostForm