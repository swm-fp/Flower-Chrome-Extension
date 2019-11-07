import React from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
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
    <Button
      variant="contained"
      className={classes.button}
      startIcon={<AccountCircle fontSize="large" />}
      onClick={() =>
        (window.location.href =
          "https://fpsampleuser.auth.ap-northeast-2.amazoncognito.com/login?response_type=token&client_id=4tja7g1k102ahesgi70t63icq3&redirect_uri=https://flower-chrome-extension.s3.ap-northeast-2.amazonaws.com/login_success.html")
      }
    >
      Login
    </Button>
  );
}
