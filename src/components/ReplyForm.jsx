import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addReply } from "../redux/commentsSlice";

const ReplyForm = ({ commentId, onSubmit }) => {
  const [name, setName] = useState("");
  const [reply, setReply] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && reply.trim()) {
      dispatch(
        addReply({
          commentId,
          name,
          text: reply,
          date: new Date().toISOString(),
        })
      );
      setName("");
      setReply("");
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reply-form">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        maxLength="50"
      />
      <textarea
        placeholder="Reply"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        required
        maxLength="500"
      />
      <button type="submit" className="post-button">
        POST
      </button>
    </form>
  );
};

export default ReplyForm;
