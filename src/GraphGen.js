/* global d3 */
import React, { Component } from 'react';
import { getSampleNodes } from './FlowerAPI'


function Graph_Read(){
	//let result = await  getSampleNodes();
  //console.log(result);
  d3.selectAll("p").style("color", "blue");

}

export default class GRAPH extends Component {
  render() {
    return (
      <div onClick={Graph_Read}>helo</div>

	);
  }
}
