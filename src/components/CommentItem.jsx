// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { editComment, deleteComment } from "../redux/commentsSlice";
// import { format } from "date-fns";
// import ReplyForm from "./ReplyForm";

// const CommentItem = ({ comment }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editText, setEditText] = useState(comment.text);
//   const [showReplyForm, setShowReplyForm] = useState(false);
//   const dispatch = useDispatch();

//   const handleEdit = () => {
//     if (editText.trim()) {
//       dispatch(editComment({ id: comment.id, text: editText }));
//       setIsEditing(false);
//     }
//   };

//   const handleDelete = () => {
//     dispatch(deleteComment(comment.id));
//   };

//   return (
//     <div className="comment-item">
//       <div className="comment-header">
//         <span className="comment-author">{comment.name}</span>
//         <span className="comment-date">
//           {format(new Date(comment.date), "dd MMM yyyy")}
//         </span>
//       </div>
//       {isEditing ? (
//         <div className="edit-form">
//           <textarea
//             value={editText}
//             onChange={(e) => setEditText(e.target.value)}
//           />
//           <button onClick={handleEdit}>Save</button>
//         </div>
//       ) : (
//         <p>{comment.text}</p>
//       )}
//       <div className="comment-actions">
//         <button onClick={() => setShowReplyForm(!showReplyForm)}>Reply</button>
//         <button onClick={() => setIsEditing(true)}>Edit</button>
//       </div>
//       <button className="delete-btn" onClick={handleDelete}>
//         ×
//       </button>
//       {showReplyForm && (
//         <ReplyForm
//           commentId={comment.id}
//           onSubmit={() => setShowReplyForm(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default CommentItem;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editComment, deleteComment } from "../redux/commentsSlice";
import { format } from "date-fns";
import ReplyForm from "./ReplyForm";
import DeleteConfirmation from "./DeleteConfirmation";

const CommentItem = ({ comment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = () => {
    if (editText.trim()) {
      dispatch(editComment({ id: comment.id, text: editText }));
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    dispatch(deleteComment(comment.id));
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="comment-item">
      <div className="comment-content">
        <div className="comment-header">
          <span className="comment-author">{comment.name}</span>
          <span className="comment-date">
            {format(new Date(comment.date), "dd MMM yyyy")}
          </span>
        </div>
        {isEditing ? (
          <div className="edit-form">
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <button onClick={handleEdit}>Save</button>
          </div>
        ) : (
          <p>{comment.text}</p>
        )}
        <div className="comment-actions">
          <button onClick={() => setShowReplyForm(!showReplyForm)}>
            Reply
          </button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      </div>
      <button className="delete-btn" onClick={handleDelete}>
        <i className="fas fa-trash"></i>
      </button>
      {showReplyForm && (
        <ReplyForm
          commentId={comment.id}
          onSubmit={() => setShowReplyForm(false)}
        />
      )}
      {showDeleteConfirmation && (
        <DeleteConfirmation
          onCancel={() => setShowDeleteConfirmation(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default CommentItem;