import React from "react";
import { Link } from "react-router-dom";
import "./PostCard.css";
import { useDispatch } from "react-redux";
import { likeOrUnlikePost, delete_Post } from "../utils/actions/post";
const PostCard = ({
  auth,
  postItem: { _id, text, name, avatar, user_id, likes, comments, date },
}) => {
  const dispatch = useDispatch();
  const addLikeOrRemove = (type, id) => {
      dispatch(likeOrUnlikePost(type,id));
  };

  return (
    <div className="post_card_container bg-white p-1 my-1">
      <div>
        <Link to={`/profile/user/${user_id}`}>
          <img
            className="round_image rounded rounded-full hover:shadow-[0_0_10px_rgba(145,145,178,0.6)]"
            src={avatar}
            alt=""
          />
          
        </Link>
      </div>
      <div className="w-full">
        <div className="flex flex-row">
          <h4 className="font-bold">{name} </h4> 
          <p className="post_date">{date.substring(0, 10)}</p>
        </div>
        <p className="post_text">{text}</p>

        <button onClick={() => addLikeOrRemove("like",_id)} type="button" className="like_btn hover:shadow-[0_0_5px_rgba(145,145,178,0.6)]">
          <i className="fas fa-thumbs-up" />{" "}
          <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
        </button>
        <button
          onClick={() => addLikeOrRemove("unlike",_id)}
          type="button"
          className="like_btn hover:shadow-[0_0_5px_rgba(145,145,178,0.6)]"
        >
          <i className="fas fa-thumbs-down" />
        </button>
        { auth && (
        <Link to={`/posts/${_id}`} className="btn btn_primary bg-cyan-500 hover:shadow-[0_0_10px_rgba(8,145,178,0.7)]">
          Comments:{" "}
          {comments.length > 0 && (
            <span className="comment-count">{comments.length}</span>
          )}
        </Link>
        )}
        {auth?.token && user_id === auth?.user?._id && (
          <button
            onClick={() => dispatch(delete_Post(_id))}
            type="button"
            className="btn btn_danger bg-rose-500 hover:bg-rose-400 hover:shadow-[0_0_10px_rgba(230,145,178,0.7)]"
          >
            <i className="fas fa-times" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PostCard;
