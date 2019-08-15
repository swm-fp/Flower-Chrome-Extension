import React, { Component } from "react";
import SortableTree from "react-sortable-tree";
import "react-sortable-tree/style.css"; // This only needs to be imported once in your app
import bookmark from "../bookmark";
import * as d3 from "d3";

// Fileview Drag n Drop 개발중

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

function scan(tree) {
  let x = {};

  x["title"] = tree.data["title"];
  if (tree.children) {
    x["children"] = [];
    for (let i in tree.children) {
      x.children.push(scan(tree.children[i]));
    }
  }
  return x;
}

async function f() {
  let data = await bookmark.createBookmarks();
  data.push({ nodeId: "1", title: "Main" });
  let root = make_root(data);
  console.log("hello");
  console.log([await scan(root)]);

  console.log([{ title: "Chicken", children: [{ title: "Egg" }] }]);
  return [await scan(root)];
}

let state = { treeData: f() };

export default class Fileview extends Component {
  render() {
    return (
      <div style={{ height: 400 }}>
        <SortableTree
          treeData={state.treeData}
          onChange={treeData => state.setState({ treeData })}
        />
      </div>
    );
  }
}
