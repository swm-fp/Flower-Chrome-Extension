import * as d3 from "d3";

import { Button } from "react-bootstrap";
import React, { Component } from "react";
import "../css/BMTreemap.css";
import bookmark from "../bookmark";

// To-do's
// 1. Responsive Size : 현재는 임시 비율 확대중
// 2. background images
// 3. links add
// 4. default background 추가

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

async function Treemap_interactive() {
  var el_id = "graph";
  let canvas = document.getElementById("graph");
  var divWidth = canvas.clientWidth;
  var color = d3
    .scaleLinear()
    .domain([0, 5])
    .range(["lightgray", "#343a40"]); // or use hex values
  var margin = { top: 30, right: 0, bottom: 20, left: 0 },
    width = divWidth,
    height = canvas.clientHeight,
    formatNumber = d3.format(","),
    transitioning;
  // sets x and y scale to determine size of visible boxes
  var x = d3
    .scaleLinear()
    .domain([0, width])
    .range([0, width]);
  var y = d3
    .scaleLinear()
    .domain([0, height])
    .range([0, height]);
  var treemap = d3
    .treemap()
    .size([width, height])
    .paddingInner(0)
    .round(false);

  var svg = d3
    .select("#" + el_id)
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", "0 0 " + width + " " + height)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .style("margin-left", -margin.left + "px")
    .style("margin.right", -margin.right + "px")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .style("shape-rendering", "crispEdges");

  var grandparent = svg.append("g").attr("class", "grandparent");

  grandparent
    .append("rect")
    .attr("y", -margin.top)
    .attr("width", width)
    .attr("height", margin.top)
    .attr("fill", d => {
      return "#48a684";
    });

  grandparent
    .append("text")
    .attr("x", 6)
    .attr("y", 6 - margin.top)
    .attr("dy", ".75em");

  // data input from my bookmarks
  let data = await bookmark.createBookmarks();
  data.push({ nodeId: "1", parentId: "" });
  var root = make_root(data);
  console.log(root);

  treemap(
    root
      .sum(function(d) {
        return 1; // 원래는 가중치 값으로 사용
      })
      .sort(function(a, b) {
        return b.height - a.height;
      })
  );
  display(root);
  function display(d) {
    grandparent
      .datum(d.parent)
      .on("click", transition)
      .select("text")
      .text(name(d));
    // grandparent color
    grandparent
      .datum(d.parent)
      .select("rect")
      .attr("fill", function() {
        return "#48a684"; // Math.floor(Math.random() * 16777215).toString(16); // random color
      });

    var g1 = svg
      .insert("g", ".grandparent")
      .datum(d)
      .attr("class", "depth");

    var g = g1
      .selectAll("g")
      .data(d.children)
      .enter()
      .append("g");
    // add class and click handler to all g's with children
    g.filter(function(d) {
      return d.children;
    })
      .classed("children", true)
      .on("click", transition);

    g.selectAll(".child")
      .data(function(d) {
        return d.children || [d];
      })
      .enter()
      .append("rect")
      .attr("class", "child")
      .call(rect);

    // add title to parents
    g.append("rect")
      .attr("class", "parent")
      .call(rect)
      .append("title")
      .text(function(d) {
        return d.data.title;
      });
    /* Adding a foreign object instead of a text object, allows for text wrapping */
    g.append("foreignObject")
      .call(rect)
      .attr("class", "foreignobj")
      .append("xhtml:div")
      .attr("dy", ".75em")
      .html(function(d) {
        return (
          "" +
          '<p class="title">' +
          d.data.title +
          "</p>" +
          "<p>" +
          formatNumber(d.value) +
          "</p>"
        );
      })
      .attr("class", "textdiv"); //textdiv class allows us to style the text easily with CSS
    function transition(d) {
      if (transitioning || !d) return;
      transitioning = true;
      var g2 = display(d),
        t1 = g1.transition().duration(650),
        t2 = g2.transition().duration(650);
      // Update the domain only after entering new elements.
      x.domain([d.x0, d.x1]);
      y.domain([d.y0, d.y1]);
      // Enable anti-aliasing during the transition.
      svg.style("shape-rendering", null);
      // Draw child nodes on top of parent nodes.
      svg.selectAll(".depth").sort(function(a, b) {
        return a.depth - b.depth;
      });
      // Fade-in entering text.
      g2.selectAll("text").style("fill-opacity", 0);
      g2.selectAll("foreignObject div").style("display", "none");
      /*added*/
      // Transition to the new view.
      t1.selectAll("text")
        .call(text)
        .style("fill-opacity", 0);
      t2.selectAll("text")
        .call(text)
        .style("fill-opacity", 1);
      t1.selectAll("rect").call(rect);
      t2.selectAll("rect").call(rect);

      /* Foreign object */
      t1.selectAll(".textdiv").style("display", "none");
      /* added */
      t1.selectAll(".foreignobj").call(foreign);
      /* added */
      t2.selectAll(".textdiv").style("display", "block");
      /* added */
      t2.selectAll(".foreignobj").call(foreign);
      /* added */
      // Remove the old node when the transition is finished.
      t1.on("end.remove", function() {
        this.remove();
        transitioning = false;
      });
    }
    return g;
  }
  function text(text) {
    text
      .attr("x", function(d) {
        return x(d.x) + 6;
      })
      .attr("y", function(d) {
        return y(d.y) + 6;
      });
  }
  function rect(rect) {
    rect
      .attr("x", function(d) {
        return x(d.x0);
      })
      .attr("y", function(d) {
        return y(d.y0);
      })
      .attr("width", function(d) {
        return x(d.x1) - x(d.x0);
      })
      .attr("height", function(d) {
        return y(d.y1) - y(d.y0);
      })
      .attr("fill", function(d) {
        return color(d.depth);
      });
  }
  function foreign(foreign) {
    /* added */
    foreign
      .attr("x", function(d) {
        return x(d.x0);
      })
      .attr("y", function(d) {
        return y(d.y0);
      })
      .attr("width", function(d) {
        return x(d.x1) - x(d.x0);
      })
      .attr("height", function(d) {
        return y(d.y1) - y(d.y0);
      });
  }
  function name(d) {
    return (
      breadcrumbs(d) +
      (d.parent ? " -  Click to zoom out" : " - Click inside square to zoom in")
    );
  }
  function breadcrumbs(d) {
    var res = "Bookmarks";
    var sep = " > ";
    d.ancestors()
      .reverse()
      .forEach(function(i) {
        res += (i.data.title ? i.data.title : "") + sep;
      });

    return res
      .split(sep)
      .filter(function(i) {
        return i !== "";
      })
      .join(sep);
  }
}

export default class BMTreemap extends Component {
  render() {
    return <Button onClick={Treemap_interactive}>Treemap Intercative</Button>;
  }
}
