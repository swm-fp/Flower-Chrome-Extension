/* global chrome */
import React, { Component } from 'react';
import FlowerAPI from './FlowerAPI';


export default class TestButton extends Component {
  render() {
    return <button onClick={FlowerAPI.getSampleNodes}> test button </button>;
  }
}
