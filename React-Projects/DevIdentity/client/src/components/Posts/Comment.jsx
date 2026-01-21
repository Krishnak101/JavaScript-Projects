import React from 'react'
import { Link } from 'react-router-dom';
import "./Comment.css";

const Comment = ({comment:{_id, user_id, avatar, text, name, date}}) => {
  return (
    <div className='comment_container bg-gray-300 text-black w-20/21'>
        <Link to={`/profile/user/${user_id}`}>
          <img
            className="round_image_comment rounded rounded-full hover:shadow-[0_0_10px_rgba(145,145,178,0.6)]"
            src={avatar}
            alt=""
          />
          
        </Link>
        <div className="w-full">
            <div className="flex flex-row">
                <h4 className="font-bold">{name} </h4> 
                <p className="post_date">{date.substring(0, 10)}</p>
            </div>
            <p className="post_text">{text}</p>
        </div>
    </div>
  )
}

export default Comment;