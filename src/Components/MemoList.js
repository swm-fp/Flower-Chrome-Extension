import React, { Component } from "react";
import FlowerAPI from "../FlowerAPI.js";
import "../css/memoList.css";
import { Card, Button, CardDeck } from "react-bootstrap";

export default class MemoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      memo: []
    };
  }
  componentDidMount() {
    this.getMemoList().then(result =>
      this.setState({
        memo: result
      })
    );
  }

  getMemoList() {
    return FlowerAPI.readAllNodes();
  }

  render() {
    const { memo } = this.state;
    const Memos = memo.map((memo, i) => (
      <Card>
        <Card.Header>
          {memo.title} ({memo.memoList.length})
        </Card.Header>
        <Card.Body>
          <Card.Text>{memo.memoList[0].text}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated few mins ago</small>
          <a href={memo.requestUrl} style={{ color: "gray" }}>
            Detail
          </a>
        </Card.Footer>
      </Card>
    ));
    return <CardDeck>{Memos}</CardDeck>;
  }
}
