/* global chrome */
import React, { Component } from 'react';
import { getBookmarkTest } from './FlowerAPI';


export default class BMButton extends Component {
  render() {
    return (
      <div onClick={getBookmarkTest}> bookmark button </div>
    );
  }
}