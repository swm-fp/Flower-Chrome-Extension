import React from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  iconButton: {
    padding: 10
  },
  avatar: {
    margin: 10
  }
});

export default function LoginButton() {
  const classes = useStyles();
  return (
    <IconButton
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      color="inherit"
      onClick={() =>
        (window.location.href =
          "https://fpsampleuser.auth.ap-northeast-2.amazoncognito.com/login?response_type=token&client_id=4tja7g1k102ahesgi70t63icq3&redirect_uri=https://flower-chrome-extension.s3.ap-northeast-2.amazonaws.com/login_success.html")
      }
      className={classes.iconButton}
    >
      <AccountCircle fontSize="large" />
    </IconButton>
  );
}
