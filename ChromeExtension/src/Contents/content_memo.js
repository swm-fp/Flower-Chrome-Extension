/* global chrome */
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "../css/memo.scss";
import "../apis/chrome-extension-async";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

let x;
let y;
let memos = undefined;

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

function removeMemo(element) {
  element.remove();

  let res = {}
  res["message"]="delete";
  res["memoId"]= element.getAttribute("memoId");
  if(res["memoId"]!=-1){
    chrome.runtime.sendMessage({ node: res });
  }
}

export default function Memo(props) {
  const [MDE, setStateMDE] = useState(props.text || "");

  const handleChange = e => {
    setStateMDE(e.target.value);
  };

  const handleChange2 = e => {
    setStateMDE(e);
  };

  useEffect(() => {
    dragElement(props.element);
    props.element.getElementsByClassName(
      "flower-memo-text"
    )[0].onkeydown = e => {
      e.stopPropagation();
    };
    if (props.text) {
      setStateMDE(props.text);
    }
  }, []);

  return (
    <InputGroup className="flower-memo-wrapper">
      <InputGroup className="flower-memo-header">
        <Button
          className="flower-memo-remove"
          onClick={() => {
            removeMemo(props.element);
          }}
        />
        <Button className="flower-memo-action1" />
        <InputGroup.Text
          className="flower-memo-title"
          id="inputGroup-sizing-sm"
        >
          Memo
        </InputGroup.Text>
      </InputGroup>
      <div className="flower-memo-content">
        <textarea
          className="flower-memo-text"
          value={MDE}
          onChange={handleChange}
        />
        <SimpleMDE
          className="flower-memo-markdown"
          value={MDE}
          onChange={handleChange2}
          options={{
            autofocus: false,
            spellChecker: false
          }}
        />
      </div>
    </InputGroup>
  );
}

function renderMemo(memoList = undefined) {
  if (memoList === undefined) {
    const memo = document.createElement("div");
    memo.classList.add("flower-memo");
    memo.style = "left:" + x + "px;top:" + y + "px;";
    memo.setAttribute('memoId', -1);

    document.body.appendChild(memo);
    ReactDOM.render(<Memo element={memo} />, memo);
  } else {
    for (let memo of memoList) {
      const memoElement = document.createElement("div");
      memoElement.classList.add("flower-memo");
      memoElement.setAttribute('memoId', memo.memoId);
      memoElement.style =
        "left:" + memo.positionLeft + ";top:" + memo.positionTop + ";";
      document.body.appendChild(memoElement);
      ReactDOM.render(
        <Memo element={memoElement} text={memo.content} />,
        memoElement
      );
    }
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "contextMenu") {
    if (!memos) {
      memos = {};
    }
    renderMemo();
  } else if (request.message === "node") {
    memos = request.node;
    if (memos) renderMemo(memos);
  }
});

window.onbeforeunload = e => {
  //node is exists
  if (memos) {
    let res = {};
    res["message"] = "save";
    let url = document.URL;

    let memoList = [];
    let memoElements = document.getElementsByClassName("flower-memo");
    for (let memoElement of memoElements) {
      let memoData = { //position
        positionLeft: memoElement.style["left"],
        positionTop: memoElement.style["top"]
      };

      if (memoElement.querySelector(".flower-memo-text").value) { //content
        memoData["content"] = memoElement.querySelector(".flower-memo-text").value;
      }

      memoData["url"] = url;
      
      let memoId = memoElement.getAttribute("memoId");
      if(memoId>0){
        memoData["memoId"] = memoId;
      }

      memoList.push(memoData);
    }
    res["memoList"] = memoList;

    console.log(res);

    chrome.runtime.sendMessage({ node: res });
  }
};
