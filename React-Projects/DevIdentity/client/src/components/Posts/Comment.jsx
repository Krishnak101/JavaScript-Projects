import React from "react";
import { Link } from "react-router-dom";
import "./Comment.css";
import { useDispatch } from "react-redux";
import { delete_Comment } from "../utils/actions/post";

const Comment = ({
  comment: { _id, user_id, avatar, text, name, date },
  auth,
  postId,
}) => {
  const dispatch = useDispatch();
  return (
    <div className="comment_container bg-gray-300 text-black">
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
          {auth?.token && user_id === auth?.user?._id && (
            <button
              onClick={() => dispatch(delete_Comment(postId, _id))}
              type="button"
              className="btn btn_danger bg-rose-500 hover:bg-rose-400 hover:shadow-[0_0_10px_rgba(230,145,178,0.7)]"
            >
              <i className=" fa-solid fa-trash text-gray-700"></i>
            </button>
          )}
        </div>
        <p className="post_text">{text}</p>
      </div>
    </div>
  );
};

export default Comment;
