import React from "react";
import Button from "@material-ui/core/Button";
export default function LoginButton() {
  return (
    <Button variant="outlined">
      <a href="https://fpsampleuser.auth.ap-northeast-2.amazoncognito.com/login?response_type=token&client_id=4tja7g1k102ahesgi70t63icq3&redirect_uri=https://fpsample.s3.ap-northeast-2.amazonaws.com/success.html">
        login button
      </a>
    </Button>
  );
}
