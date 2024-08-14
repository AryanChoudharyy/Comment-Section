import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../redux/commentsSlice";

const CommentForm = () => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && comment.trim()) {
      dispatch(
        addComment({ name, text: comment, date: new Date().toISOString() })
      );
      setName("");
      setComment("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        maxLength="50"
      />
      <textarea
        placeholder="Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        maxLength="500"
      />
      <button type="submit" className="post-button">
        POST
      </button>
    </form>
  );
};

export default CommentForm;