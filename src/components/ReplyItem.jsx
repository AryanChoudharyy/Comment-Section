// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { editComment, deleteComment } from "../redux/commentsSlice";
// import { format } from "date-fns";

// const ReplyItem = ({ reply }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editText, setEditText] = useState(reply.text);
//   const dispatch = useDispatch();

//   const handleEdit = () => {
//     if (editText.trim()) {
//       dispatch(editComment({ id: reply.id, text: editText }));
//       setIsEditing(false);
//     }
//   };

//   const handleDelete = () => {
//     dispatch(deleteComment(reply.id));
//   };

//   return (
//     <div className="reply-item">
//       <div className="reply-header">
//         <span className="reply-author">{reply.name}</span>
//         <span className="reply-date">
//           {format(new Date(reply.date), "dd MMM yyyy")}
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
//         <p>{reply.text}</p>
//       )}
//       <div className="reply-actions">
//         <button onClick={() => setIsEditing(true)}>Edit</button>
//       </div>
//       <button className="delete-btn" onClick={handleDelete}>
//         ×
//       </button>
//     </div>
//   );
// };

// export default ReplyItem;


import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editComment, deleteComment } from "../redux/commentsSlice";
import { format } from "date-fns";
import DeleteConfirmation from "./DeleteConfirmation";

const ReplyItem = ({ reply }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(reply.text);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = () => {
    if (editText.trim()) {
      dispatch(editComment({ id: reply.id, text: editText }));
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    dispatch(deleteComment(reply.id));
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="reply-item">
      <div className="reply-header">
        <span className="reply-author">{reply.name}</span>
        <span className="reply-date">
          {format(new Date(reply.date), "dd MMM yyyy")}
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
        <p>{reply.text}</p>
      )}
      <div className="reply-actions">
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </div>
      <button className="delete-btn" onClick={handleDelete}>
        <i className="fas fa-trash"></i>
      </button>
      {showDeleteConfirmation && (
        <DeleteConfirmation
          onCancel={() => setShowDeleteConfirmation(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default ReplyItem;