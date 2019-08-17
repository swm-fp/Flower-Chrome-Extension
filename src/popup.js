import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/popup.css";

class Popup extends Component {
  render() {
    return (
      <div class="container">
        <h1>Sidepannel</h1>
        <div className="Memo" />
      </div>
    );
  }
}

ReactDOM.render(<Popup />, document.getElementById("root"));
