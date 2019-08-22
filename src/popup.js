import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/popup.css";
import FlowerAPI from "./FlowerAPI";

async function Tags() {
  let node = 
  {
    title : "플라워 북마크 서비스로 하는 효율적인 북마크 관리!",
    url : "www",
    memo : undefined,
    highlight : undefined
  }
  let data = await FlowerAPI.getTags(node);
  console.log(data);
}

class Popup extends Component {
  render() {
    return (
      <div class="container">
        <h1>Sidepannel</h1>
        <div className="Memo" />
        <Button onClick={Tags}>북마크 추가</Button>
      </div>
    );
  }
}

ReactDOM.render(<Popup />, document.getElementById("root"));
