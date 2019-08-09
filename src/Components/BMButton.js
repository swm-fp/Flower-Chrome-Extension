/* global chrome */
import React, { Component } from "react";
import FlowerAPI from "../FlowerAPI";

export default class BMButton extends Component {
  render() {
    return <button onClick={FlowerAPI.getBookmarkTest}> bookmark button </button>;
  }
}
