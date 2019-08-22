/* global chrome */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/popup.css";
import FlowerAPI from "./FlowerAPI";

async function Tags() {
  let title = await chrome.tabs.executeScript({
    code: 'document.querySelector("title").innerText'
  });

  let url = await chrome.tabs.executeScript({
    code: 'document.URL'
  });
  
  let node = 
  {
    title : title[0],
    url : url[0],
    memo : undefined,
    highlight : undefined
  }

  console.log(node);

  let data = await FlowerAPI.getTags(node);

  for(let i=0;i<data.length;i++){
    console.log(data[i][0]);
  }
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
