/* global chrome */
import React, { Component } from 'react';
import { API1 } from './FlowerAPI';


export default class TestButton extends Component {
  render() {
    return (
      <div onClick={API1}> test button </div>
    );
  }
}