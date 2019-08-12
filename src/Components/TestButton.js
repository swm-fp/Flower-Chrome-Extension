/* global chrome */
import React, { Component } from "react";
import FlowerAPI from "../FlowerAPI";
import { Button } from "react-bootstrap";
export default class TestButton extends Component {
  render() {
    let projectId = "simpleProject";
    let data = {nodes:[
      {
        nodeId: "1",
        parentId: "-1",
        title: "cs231n",
        url: "null",
        isFolder: true,
        children: ["2", "3"]
      },
      {
        nodeId: "2",
        parentId: "1",
        title: "hello world",
        url: "https://www.naver.com",
        children: []
      },
      {
        nodeId: "3",
        parentId: "1",
        title: "hello fp",
        url: "https://www.naver.com",
        children: []
      }
    ]};
    return (
      <div>
        <Button onClick={FlowerAPI.getSampleNodes}>
          {" "}
          test getSampleNodes{" "}
        </Button>
        <Button onClick={() => FlowerAPI.readNodes(projectId)}>
          {" "}
          test readNodes{" "}
        </Button>
        <Button onClick={() => FlowerAPI.createNodes(projectId, data)}>
          {" "}
          test createNodes{" "}
        </Button>
      </div>
    );
  }
}
