import React, { Component } from "react";
import "../css/grid.css";
import RGL, { WidthProvider } from "react-grid-layout";

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
    verticalCompact: false,
    preventCollision: true
  };

  constructor(props) {
    super(props);

    const layout = [
      { i: "graph", x: 0, y: 0, w: 9, h: 10 },
      { i: "directory", x: 0, y: 10, w: 9, h: 5 },
      { i: "memo", x: 9, y: 0, w: 3, h: 15 }
    ];
    this.state = { layout };
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  render() {
    return (
      <div className="app-container container-fluid">
        <div className="main-section">
          <ReactGridLayout
            layout={this.state.layout}
            onLayoutChange={this.onLayoutChange}
            {...this.props}
          >
            <div id="graph" key="graph" className="block" />
            <div key="directory" className="block">
              <p>Directory Part (TBD) </p>
            </div>
            <div key="memo" className="block">
              <p>Memo Part (TBD) </p>
            </div>
          </ReactGridLayout>
        </div>
      </div>
    );
  }
}
