/* global chrome */
import React, { Component } from "react";
import { getBookmarkTest } from "./FlowerAPI";

export default class BMButton extends Component {
  render() {
    return <button onClick={getBookmarkTest}> bookmark button </button>;
  }
}
