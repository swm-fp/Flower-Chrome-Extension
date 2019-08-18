import React, { Component } from "react";
import "../css/grid.css";
import RGL, { WidthProvider } from "react-grid-layout";
import MemoList from "./MemoList";
import { Alert } from "react-bootstrap";

// To-do's
// 1. Responsive Local Storage Layout : 그리드 크기 변경후 로컬 또는 서버 저장
// https://github.com/STRML/react-grid-layout/blob/master/test/examples/8-localstorage-responsive.jsx
// 2. size rendoring error
// 3. add and remove components
// https://github.com/STRML/react-grid-layout/blob/master/test/examples/6-dynamic-add-remove.jsx

const ReactGridLayout = WidthProvider(RGL);

export default class MainSectionGrid extends Component {
  static defaultProps = {
    className: "layout",
    cols: 12,
    rowHeight: 35,
    onLayoutChange: function() {},
    // This turns off compaction so you can place items wherever.
    verticalCompact: false
    //preventCollision: true
  };

  constructor(props) {
    super(props);

    const layout = [
      { i: "graph", x: 0, y: 6, w: 15, h: 9 },
      { i: "memo", x: 0, y: 0, w: 15, h: 6 },
      { i: "directory", x: 0, y: 9, w: 15, h: 5 }
    ];
    this.state = {
      layout
    };
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  render() {
    return (
      <div className="app-container container-fluid">
        <div className="main-section">
          <Alert variant="warning">
            <b>Version 1.0.1</b> : Flower Demo Version 배포가 준비 중입니다.
          </Alert>
          <ReactGridLayout
            layout={this.state.layout}
            onLayoutChange={this.onLayoutChange}
            {...this.props}
          >
            <div id="graph" key="graph" className="block" />
            <div key="directory" className="block">
              <h4 className="sub-title">Directory Part </h4>
            </div>
            <div key="memo" className="block">
              <h4 className="sub-title"> Memo </h4>
              <MemoList />
            </div>
          </ReactGridLayout>
        </div>
      </div>
    );
  }
}
