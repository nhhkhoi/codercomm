import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteComment } from "./commentSlice";
import { useDispatch } from "react-redux";

export default function CommentDeleteModal({ commentId, postId }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const handleDeleteComment = ({ commentId, postId }) => {
    dispatch(deleteComment({ commentId, postId }));
  };

  return (
    <div>
      <Button sx={{ marginLeft: "10px" }} onClick={handleClickOpen}>
        Delete Comment
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Comment Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete this comment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Let me reconsider</Button>
          <Button
            onClick={() => handleDeleteComment({ commentId, postId })}
            autoFocus
          >
            Delete it
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
