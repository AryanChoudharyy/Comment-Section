import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sortComments } from "../redux/commentsSlice";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import ReplyItem from "./ReplyItem";

const CommentSection = () => {
  const comments = useSelector((state) => state.comments.comments);
  const dispatch = useDispatch();
  const [showSort, setShowSort] = useState(false);

  useEffect(() => {
    setShowSort(comments.length > 0);
  }, [comments]);

  const handleSort = () => {
    dispatch(sortComments());
  };

  return (
    <div className="comment-section">
      <h2>Comment</h2>
      <CommentForm />
      {showSort && (
        <button className="sort-button" onClick={handleSort}>
          Sort By: Date and Time ↓
        </button>
      )}
      <div className="comments-list">
        {comments.map((comment) => (
          <React.Fragment key={comment.id}>
            <CommentItem comment={comment} />
            {comment.replies.map((reply) => (
              <ReplyItem key={reply.id} reply={reply} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;

