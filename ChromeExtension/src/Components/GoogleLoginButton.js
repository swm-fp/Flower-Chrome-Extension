import React from "react";
import googleLogin from "../googleLogin";
import Button from "@material-ui/core/Button";

export default function GoogleLoginButton() {
  return (
    <div className="button-group">
      <Button onClick={googleLogin.login} variant="outlined">
        Login
      </Button>
      <Button onClick={googleLogin.logout} variant="outlined">
        Logout
      </Button>
      <Button onClick={googleLogin.showLoginInfo} variant="outlined">
        get Login Info
      </Button>
    </div>
  );
}
