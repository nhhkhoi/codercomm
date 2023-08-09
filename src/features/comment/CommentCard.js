import React from "react";
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";

import useAuth from "../../hooks/useAuth";
import CommentDeleteModal from "./CommentDeleteModal";

function CommentCard({ comment, postId }) {
  const commentId = comment._id;
  const state = useAuth();
  const userID = state.user._id;

  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            {fDate(comment.createdAt)}
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment.content}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CommentReaction comment={comment} />
          {userID === comment.author._id ? (
            <CommentDeleteModal commentId={commentId} postId={postId} />
          ) : (
            ""
          )}
        </Box>
      </Paper>
    </Stack>
  );
}

export default CommentCard;
