import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
  },
  reducers: {
    addComment: (state, action) => {
      state.comments.push({ ...action.payload, id: Date.now(), replies: [] });
    },
    addReply: (state, action) => {
      const comment = state.comments.find(
        (c) => c.id === action.payload.commentId
      );
      if (comment) {
        comment.replies.push({ ...action.payload, id: Date.now() });
      }
    },
    editComment: (state, action) => {
      const { id, text } = action.payload;
      const comment = state.comments.find((c) => c.id === id);
      if (comment) {
        comment.text = text;
      } else {
        for (let comment of state.comments) {
          const reply = comment.replies.find((r) => r.id === id);
          if (reply) {
            reply.text = text;
            break;
          }
        }
      }
    },
    deleteComment: (state, action) => {
      state.comments = state.comments.filter((c) => c.id !== action.payload);
      state.comments.forEach((comment) => {
        comment.replies = comment.replies.filter(
          (r) => r.id !== action.payload
        );
      });
    },
    sortComments: (state, action) => {
      if (action.payload) {
        state.comments = action.payload;
      }
      state.comments.sort((a, b) => new Date(b.date) - new Date(a.date));
      state.comments.forEach((comment) => {
        comment.replies.sort((a, b) => new Date(b.date) - new Date(a.date));
      });
    },
  },
});

export const {
  addComment,
  addReply,
  editComment,
  deleteComment,
  sortComments,
} = commentsSlice.actions;
export default commentsSlice.reducer;
