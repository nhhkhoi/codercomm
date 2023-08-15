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
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openDialogDeleteMenu, setOpenDialogDeleteMenu] = React.useState(false);
  const [openDialogEditMenu, setOpenDialogEditMenu] = React.useState(false);
  const handleClickOpenDialogDeleteMenu = () => {
    setOpenDialogDeleteMenu(true);
    handleClose();
  };
  const handleCloseDialogDeleteMenu = () => {
    setOpenDialogDeleteMenu(false);
  };
  const handleClickOpenDialogEditMenu = () => {
    setOpenDialogEditMenu(true);

    handleClose();
  };
  const handleCloseDialogEditMenu = () => {
    setOpenDialogEditMenu(false);
  };

  const dispatch = useDispatch();
  const handleDeletePost = ({ postId }) => {
    dispatch(deletePost({ postId }));
    handleCloseDialogDeleteMenu();
  };

  return (
    <div>
      <IconButton
        id="vert-icon"
        aria-controls={open ? "vert-icon" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleOpen}
      >
        <MoreVertIcon sx={{ fontSize: 30 }} />
      </IconButton>
      <Menu
        id="vert-icon"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        placement="bottom-start"
        keepMounted
        MenuListProps={{
          "aria-labelledby": "vert-icon",
        }}
      >
        <MenuItem>
          <div onClick={handleClickOpenDialogDeleteMenu}>Delete</div>
          <Dialog
            open={openDialogDeleteMenu}
            onClose={handleCloseDialogDeleteMenu}
            onBlur={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              "Delete Post Confirmation"
            </DialogTitle>

            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Do you really want to delete this post?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialogDeleteMenu}>No way</Button>
              <Button onClick={() => handleDeletePost({ postId })} autoFocus>
                Heck Yeah
              </Button>
            </DialogActions>
          </Dialog>
        </MenuItem>
        <MenuItem>
          <div onClick={handleClickOpenDialogEditMenu}>Edit</div>
          <Dialog
            open={openDialogEditMenu}
            onClose={handleCloseDialogEditMenu}
            onBlur={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">"Edit Post"</DialogTitle>
            <EditFormModal
              postId={postId}
              handleCloseDialogEditMenu={handleCloseDialogEditMenu}
            />
          </Dialog>
        </MenuItem>
      </Menu>
    </div>
  );
}
