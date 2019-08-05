/* global chrome */
import React, { Component } from 'react';
import { getSampleNodes } from './FlowerAPI';


export default class TestButton extends Component {
  render() {
    return (
      <div onClick={getSampleNodes}> test button </div>
    );
  }
}