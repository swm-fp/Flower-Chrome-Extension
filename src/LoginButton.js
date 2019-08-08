import React, { Component } from "react";

export default class LoginButton extends Component {
  render() {
    return (
      <button href="https://fpsampleuser.auth.ap-northeast-2.amazoncognito.com/login?response_type=token&client_id=4tja7g1k102ahesgi70t63icq3&redirect_uri=https://fpsample.s3.ap-northeast-2.amazonaws.com/success.html">
        login button
      </button>
    );
  }
}
