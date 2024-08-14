import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editComment, deleteComment } from "../redux/commentsSlice";
import { format } from "date-fns";
import Reply from "./Reply";
import CommentForm from "./CommentForm";

const Comment = ({ comment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(editComment({ id: comment.id, text: editText }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteComment(comment.id));
  };

  return (
    <div className="comment">
      <h3>{comment.name}</h3>
      <p>{format(new Date(comment.date), "dd MMM yyyy")}</p>
      {isEditing ? (
        <div>
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <p>{comment.text}</p>
      )}
      <button onClick={handleEdit}>Edit</button>
      <button className="delete-btn" onClick={handleDelete}>
        ×
      </button>
      <CommentForm parentId={comment.id} isReply={true} />
      {comment.replies.map((reply) => (
        <Reply key={reply.id} reply={reply} />
      ))}
    </div>
  );
};

export default Comment;
