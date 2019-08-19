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

async function f() {}

export default class Fileview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookmarks: []
    };
  }
  componentDidMount() {
    this.getBMList()
      .then(result => {
        console.log(result);
        result.push({ nodeId: "1", title: "Main" });
        let root = make_root(result);
        console.log(root);
        return [scan(root)];
      })
      .then(result =>
        this.setState({
          bookmarks: result
        })
      );
  }

  getBMList() {
    return bookmark.createBookmarks();
  }

  render() {
    return (
      <div style={{ height: "100%" }}>
        <SortableTree
          treeData={this.state.bookmarks}
          onChange={bookmarks => this.setState({ bookmarks })}
        />
      </div>
    );
  }
}
