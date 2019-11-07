import React, { Component } from "react";
import SortableTree from "react-sortable-tree";
import "react-sortable-tree/style.css"; // This only needs to be imported once in your app
import bookmark from "../bookmark";
import * as d3 from "d3";

import FileExplorerTheme from "react-sortable-tree-theme-file-explorer";

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
  x["isDirectory"] = tree.data["isFolder"];
  if (tree.children) {
    x["children"] = [];
    for (let i in tree.children) {
      x.children.push(scan(tree.children[i]));
    }
  }
  console.log(x);
  return x;
}

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
        result.push({ nodeId: "1", title: "Main", isFolder: true });
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
          theme={FileExplorerTheme}
          generateNodeProps={rowInfo => ({
            icons: rowInfo.node.isDirectory
              ? [
                  <div
                    style={{
                      borderLeft: "solid 8px gray",
                      borderBottom: "solid 10px gray",
                      marginRight: 10,
                      boxSizing: "border-box",
                      width: 16,
                      height: 12,
                      filter: rowInfo.node.expanded
                        ? "drop-shadow(1px 0 0 gray) drop-shadow(0 1px 0 gray) drop-shadow(0 -1px 0 gray) drop-shadow(-1px 0 0 gray)"
                        : "none",
                      borderColor: rowInfo.node.expanded ? "white" : "gray"
                    }}
                  />
                ]
              : [
                  <div
                    style={{
                      border: "solid 1px black",
                      fontSize: 8,
                      textAlign: "center",
                      marginRight: 10,
                      width: 12,
                      height: 16
                    }}
                  >
                    F
                  </div>
                ]
          })}
        />
      </div>
    );
  }
}
