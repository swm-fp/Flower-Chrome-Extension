import React, { useState, useEffect } from "react";
import FlowerAPI from "../FlowerAPI.js";
import "../css/memoList.css";
import { Card, CardColumns } from "react-bootstrap";

function MemoList(props) {
  const [memo, setStateMemo] = useState([]);

  useEffect(() => {
    getMemoList().then(res => setStateMemo(res));
  }, []);

  let getMemoList = async () => {
    return await FlowerAPI.readAllNodes();
  };
  let Memos = "";
  if (memo.length > 0) {
    Memos = memo.map((memo, i) => (
      <Card>
        <Card.Header>{memo.title}</Card.Header>
        <Card.Body>
          {/* <Card.Text>{memo.memoList[0].text}</Card.Text> */}
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated few mins ago</small>
          <a href={memo.requestUrl} style={{ color: "gray" }}>
            Detail
          </a>
        </Card.Footer>
      </Card>
    ));
  }
  return <CardColumns>{Memos}</CardColumns>;
}

export default MemoList;
