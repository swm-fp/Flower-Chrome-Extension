/* global chrome */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { WithContext as ReactTags } from "react-tag-input";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import "./css/popup.css";
import FlowerAPI from "./apis/FlowerAPI";

const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default class TagApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      suggestions: []
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  componentDidMount() {
    console.log("bhw1994");
    this.Tags().then(result =>
      this.setState({
        tags: result
      })
    );
  }

  handleDelete(i) {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i)
    });
  }

  handleAddition(tag) {
    this.setState(state => ({ tags: [...state.tags, tag] }));
  }

  handleDrag(tag, currPos, newPos) {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: newTags });
  }

  async Tags() {


    let response = await chrome.runtime.sendMessage({ message: "nlp" });
    console.log(response);
    let result = [];
    if (response.tags) {
      for (let i = 0; i < response.tags.length; i++) {
        result.push({ id: response.tags[i], text: response.tags[i] });
      }
    }
    return result;
  }

  render() {
    const { tags, suggestions } = this.state;
    return (
      <div>
        <ReactTags
          inputFieldPosition="inline"
          tags={tags}
          suggestions={suggestions}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          handleDrag={this.handleDrag}
          delimiters={delimiters}
        />
      </div>
    );
  }
}


