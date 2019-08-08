/* global chrome */
import React, { Component } from "react";
import { getSampleNodes } from "./FlowerAPI";

export default class TestButton extends Component {
  render() {
    return <button onClick={getSampleNodes}> test button </button>;
  }
}
