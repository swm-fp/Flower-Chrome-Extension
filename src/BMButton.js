/* global chrome */
import React, { Component } from "react";
import { getBookmarkTest } from "./FlowerAPI";

export default class BMButton extends Component {
  render() {
    return <BMButton onClick={getBookmarkTest}> bookmark button </BMButton>;
  }
}
