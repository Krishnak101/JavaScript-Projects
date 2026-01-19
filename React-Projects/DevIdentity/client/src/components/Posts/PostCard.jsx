import React from "react";
import { Link } from "react-router-dom";
import "./PostCard.css";
import { useDispatch } from "react-redux";
import { likeOrUnlikePost } from "../utils/actions/post";
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
            className="round_image rounded rounded-full"
            src={avatar}
            alt=""
          />
          <h4>{name.split(" ")[0]}</h4>
        </Link>
      </div>
      <div>
        <p className="post_text">{text}</p>
        <p>
          <i className="post_date">Posted on {date.substring(0, 10)}</i>
        </p>

        <button onClick={() => addLikeOrRemove("like",_id)} type="button" className="like_btn">
          <i className="fas fa-thumbs-up" />{" "}
          <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
        </button>
        <button
          onClick={() => addLikeOrRemove("unlike",_id)}
          type="button"
          className="like_btn"
        >
          <i className="fas fa-thumbs-down" />
        </button>
        <Link to={`/posts/${_id}`} className="btn btn_primary">
          Comments:{" "}
          {comments.length > 0 && (
            <span className="comment-count">{comments.length}</span>
          )}
        </Link>
        {auth.token && user_id === auth.user?._id && (
          <button
            onClick={() => deletePost(_id)}
            type="button"
            className="btn btn_danger"
          >
            <i className="fas fa-times" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PostCard;
