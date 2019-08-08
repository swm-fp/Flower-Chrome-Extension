/* global d3 */
import React, { Component } from "react";
import FlowerAPI from "./FlowerAPI";

async function Tree() {
  let result = await FlowerAPI.getSampleNodes();
  console.log(result);
  let dataSet = [];
  for (let i = 0; i < result.length; i++) {
    dataSet.push(parseInt(result[i].nodeId, 10) * 10);
  }
  let svg = d3
    .select("#graph")
    .append("svg")
    .attr("width", 500)
    .attr("height", 800);

  let circles = svg
    .selectAll("circle")
    .data(dataSet)
    .enter()
    .append("circle");

  circles
    .attr("cx", (d, i) => {
      return i * 50 + 25;
    })
    .attr("cy", 800 / 2)
    .attr("r", d => {
      return d;
    });
}

export default class GRAPH extends Component {
  render() {
    return <button onClick={Tree}>Tree</button>;
  }
}
