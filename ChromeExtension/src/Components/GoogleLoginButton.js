/* global chrome */
import React, { Component } from "react";
import googleLogin from "../googleLogin";
import { Button } from "react-bootstrap";
export default class GoogleLoginButton extends Component {
  render() {
    return (
      <div>
        <Button onClick={googleLogin.login}>
          {" "}
          Login{" "}
        </Button>
        <Button onClick={googleLogin.logout}>
          {" "}
          Logout{" "}
        </Button>
        <Button onClick={googleLogin.showLoginInfo}>
          {" "}
          get Login Info{" "}
        </Button>
      </div>
    );
  }
}
