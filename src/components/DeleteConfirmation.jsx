import React from "react";

const DeleteConfirmation = ({ onCancel, onConfirm }) => {
  return (
    <div className="delete-confirmation-overlay">
      <div className="delete-confirmation">
        <h2>Are you sure you want to delete this post?</h2>
        <p>
          This will delete this post permanently. You cannot undo this action.
        </p>
        <div className="delete-confirmation-actions">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirm-delete-btn" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
