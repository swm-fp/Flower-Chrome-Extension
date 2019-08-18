/* global chrome */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../css/memo.css";
import "../chrome-extension-async";
import { Button, FormControl, InputGroup } from "react-bootstrap";

let x;
let y;
let node = undefined;

document.addEventListener(
  "mousemove",
  function(event) {
    x = event.layerX;
    y = event.layerY;
  },
  false
);

function dragElement(elmnt) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  elmnt.getElementsByClassName(
    "flower-memo-header"
  )[0].onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


function removeMemo(element){
  element.remove();
}

export default class Memo extends Component {
  render() {
    return (
      <InputGroup className="flower-memo-wrapper">
        <InputGroup className="flower-memo-header">
          <Button className="flower-memo-remove" onClick={()=>{removeMemo(this.props.element)}} />
          <Button className="flower-memo-action1" />
          <InputGroup.Text
            className="flower-memo-title"
            id="inputGroup-sizing-sm"
          >
            Memo
          </InputGroup.Text>
        </InputGroup>
        <div className="flower-memo-content">
          <FormControl
            as="textarea"
            className="flower-memo-text"
            placeholder={this.default_content}
          />
        </div>
      </InputGroup>
    );
  }
  componentDidMount() {
    dragElement(this.props.element);
    this.props.element.getElementsByClassName(
      "flower-memo-text"
    )[0].onkeydown = e => {
      e.stopPropagation();
    };
    if (this.props.text) {
      this.props.element.getElementsByClassName(
        "flower-memo-text"
      )[0].value = this.props.text;
    }
  }
}

function renderMemo(memoList = undefined) {
  if (memoList == undefined) {
    const memo = document.createElement("div");
    memo.classList.add("flower-memo");
    memo.style = "left:" + x + "px;top:" + y + "px;";

    document.body.appendChild(memo);
    ReactDOM.render(<Memo element={memo} />, memo);
  } else {
    for (let memo of memoList) {
      const memoElement = document.createElement("div");
      memoElement.classList.add("flower-memo");
      memoElement.style =
        "left:" + memo.position.left + ";top:" + memo.position.top + ";";
      document.body.appendChild(memoElement);
      ReactDOM.render(
        <Memo element={memoElement} text={memo.text} />,
        memoElement
      );
    }
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("catch message :" + request.message);
  if (request.message === "contextMenu") {
    renderMemo();
  } else if (request.message === "node") {
    node = request.node;
    if (node.memoList) renderMemo(node.memoList);
  }
});

window.onbeforeunload = e => {
  //node is exists
  if( node ){

    node["title"] = document.title;

    let memoList = [];
    let memoElements = document.getElementsByClassName("flower-memo");
    for (let memoElement of memoElements) {
      let memoData = {
        position: {
          left: memoElement.style["left"],
          top: memoElement.style["top"]
        }
      };
      if (memoElement.querySelector("textarea").value) {
        memoData["text"] = memoElement.querySelector("textarea").value;
      }

      memoList.push(memoData);
    }
    node["memoList"] = memoList;

    chrome.runtime.sendMessage({ node: node });
  }
};
