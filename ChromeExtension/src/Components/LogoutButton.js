import React from "react";

import FlowerAPI from "../apis/FlowerAPI";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
const useStyles = makeStyles({
  iconButton: {
    padding: 0
  },
  profile: {
    display: "contents"
  },
  avatar: {
    margin: 10
  }
});

export default function LogoutButton() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const logoutOpen = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    FlowerAPI.updateLogoutState();
    window.location.reload(false);
  };

  return (
    <div className={classes.profile}>
      <IconButton
        aria-haspopup="true"
        color="inherit"
        onClick={handleMenu}
        className={classes.iconButton}
      >
        <Avatar className={classes.avatar}>H</Avatar>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={logoutOpen}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={() => logout()}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
