/* global chrome */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { WithContext as ReactTags } from "react-tag-input";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/popup.css";
import FlowerAPI from "./FlowerAPI";

const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class TagApp extends React.Component {
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
    let title = await chrome.tabs.executeScript({
      code: 'document.querySelector("title").innerText'
    });

    let url = await chrome.tabs.executeScript({
      code: "document.URL"
    });

    let node = {
      title: title[0],
      url: url[0],
      memo: undefined,
      highlight: undefined
    };

    console.log(node);

    let data = await FlowerAPI.getTags(node);

    let result = [];
    for (let i = 0; i < data.length; i++) {
      result.push({ id: data[i][0], text: data[i][0] });
    }
    return result;
  }

  render() {
    const { tags, suggestions } = this.state;
    return (
      <div>
        <ReactTags
          inputFieldPosition="top"
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

class Popup extends Component {
  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Label>
            <h3 className="modal_tags">Tags</h3>
          </Form.Label>

          <Form.Text className="text-muted">
            태그는 삭제 또는 추가할 수 있습니다.
          </Form.Text>
        </Form.Group>
        <TagApp />
      </Form>
    );
  }
}

ReactDOM.render(<Popup />, document.getElementById("root"));
