import * as d3 from "d3";
import * as d3plus from "d3plus-react";

import React, { Component } from "react";

import bookmark from "../bookmark";
import { Button } from "react-bootstrap";

function make_root(data) {
  return d3
    .stratify()
    .id(d => {
      return d.nodeId;
    })
    .parentId(d => {
      return d.parentId;
    })(data);
}

async function Tree() {
  let data = await bookmark.createBookmarks();
  //console.log(data);
  data.push({ id: "1", parentID: "" });
  var svg = d3
    .select("#graph")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .append("g")
    .attr("transform", "translate(50,50)");

  let daraStructure = make_root(data);

  let treeStructure = d3.tree().size([700, 700]);
  let information = treeStructure(daraStructure);

  let circles = svg
    .append("g")
    .selectAll("circle")
    .data(information.descendants());

  circles
    .enter()
    .append("circle")
    .attr("cx", d => {
      return d.x;
    })
    .attr("cy", d => {
      return d.y;
    })
    .attr("r", 5);

  let connections = svg
    .append("g")
    .selectAll("path")
    .data(information.links());

  connections
    .enter()
    .append("path")
    .attr("d", d => {
      return (
        "M" +
        d.source.x +
        "," +
        d.source.y +
        " C " +
        d.source.x +
        "," +
        (d.source.y + d.target.y) / 2 +
        " " +
        d.target.x +
        "," +
        (d.source.y + d.target.y) / 2 +
        " " +
        d.target.x +
        "," +
        d.target.y
      );
    });

  var names = svg
    .append("g")
    .selectAll("text")
    .data(information.descendants());

  names
    .enter()
    .append("text")
    .text(d => {
      return d.data.title;
    })
    .attr("x", d => {
      return d.x + 5;
    })
    .attr("y", d => {
      return d.y + 2;
    });
}

async function Treemap_Naive() {
  let data = await bookmark.createBookmarks();
  data.push({ nodeId: "1" });
  let margin = { top: 10, right: 10, bottom: 10, left: 10 };

  let svg = d3
    .select("#graph")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("align", "center")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  let root = make_root(data);
  root.sum(d => {
    return 1;
  });
  console.log(root);
  d3
    .treemap()
    .size([1000, 1000])
    .padding(4)(root);
  // Treemap 구조
  svg
    .selectAll("rect")
    .data(root.leaves())
    .enter()
    .append("rect")
    .attr("x", function(d) {
      return d.x0;
    })
    .attr("y", function(d) {
      return d.y0;
    })
    .attr("width", function(d) {
      return d.x1 - d.x0;
    })
    .attr("height", function(d) {
      return d.y1 - d.y0;
    })
    .on("click", function(d) {
      window.open(d.data.url);
    })
    .style("stroke", "black")
    .style("fill", "#69b3a2");

  // Treemap text
  svg
    .selectAll("text")
    .data(root.leaves())
    .enter()
    .append("text")
    .attr("x", function(d) {
      return d.x0 + 10;
    }) // +10 to adjust position (more right)
    .attr("y", function(d) {
      return d.y0 + 20;
    }) // +20 to adjust position (lower)
    .text(function(d) {
      return d.data.title;
    })
    .attr("font-size", "15px")
    .attr("fill", "white");
}

export default class GRAPH extends Component {
  render() {
    return (
      <div>
        <Button onClick={Tree}>Tree</Button>
        <Button onClick={Treemap_Naive}>Treemap</Button>
      </div>
    );
  }
}
