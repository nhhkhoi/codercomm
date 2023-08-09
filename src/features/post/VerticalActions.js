import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deletePost } from "./postSlice";
import { useDispatch } from "react-redux";
import EditFormModal from "./EditFormModal";

export default function VertIcon({ postId }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openDialog1, setOpenDialog1] = React.useState(false);
  const [openDialog2, setOpenDialog2] = React.useState(false);
  const handleClickOpenDialog1 = () => {
    setOpenDialog1(true);
  };
  const handleCloseDialog1 = () => {
    setOpenDialog1(false);
    handleClose();
  };
  const handleClickOpenDialog2 = () => {
    setOpenDialog2(true);
  };
  const handleCloseDialog2 = () => {
    setOpenDialog2(false);
    handleClose();
  };

  const dispatch = useDispatch();
  const handleDeletePost = ({ postId }) => {
    dispatch(deletePost({ postId }));
    handleCloseDialog1();
  };

  return (
    <div>
      <IconButton
        id="vert-icon"
        aria-controls={open ? "vert-icon" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon sx={{ fontSize: 30 }} />
      </IconButton>
      <Menu
        id="vert-icon"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "vert-icon",
        }}
      >
        <MenuItem>
          <div onClick={handleClickOpenDialog1}>Delete</div>
          <Dialog
            open={openDialog1}
            onClose={handleCloseDialog1}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Delete Post Confirmation"}
            </DialogTitle>

            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Do you really want to delete this post?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog1}>No way</Button>
              <Button onClick={() => handleDeletePost({ postId })} autoFocus>
                Heck Yeah
              </Button>
            </DialogActions>
          </Dialog>
        </MenuItem>
        <MenuItem>
          <div onClick={handleClickOpenDialog2}>Edit</div>
          <Dialog
            open={openDialog2}
            onClose={handleCloseDialog2}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Edit Post"}</DialogTitle>
            <EditFormModal
              postId={postId}
              handleCloseDialog2={handleCloseDialog2}
            />
          </Dialog>
        </MenuItem>
      </Menu>
    </div>
  );
}
