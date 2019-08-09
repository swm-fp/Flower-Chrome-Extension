/* global chrome */
import React, { Component } from "react";
import bookmark from "./bookmark";

export default class BMButton extends Component {
  render() {
    return <button onClick={bookmark.createBookmarks}> bookmark button </button>;
  }
}
