import React, { Component } from "react";
import bookmark from "../bookmark";
import { Button } from "react-bootstrap";
export default class BMButton extends Component {
  render() {
    return (
      <Button onClick={bookmark.createBookmarks}> bookmark button </Button>
    );
  }
}
