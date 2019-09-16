import React from "react";
import "../css/grid.css";
import RGL, { WidthProvider } from "react-grid-layout";
import MemoList from "./MemoList";
import { Alert } from "react-bootstrap";
import Fileview from "./Fileview.js";
// To-do's
// 1. Responsive Local Storage Layout : 그리드 크기 변경후 로컬 또는 서버 저장
// https://github.com/STRML/react-grid-layout/blob/master/test/examples/8-localstorage-responsive.jsx
// 2. size rendoring error
// 3. add and remove components
// https://github.com/STRML/react-grid-layout/blob/master/test/examples/6-dynamic-add-remove.jsx

const ReactGridLayout = WidthProvider(RGL);

function MainDashboard(props) {
  const defaultProps = {
    className: "layout",
    cols: 15,
    rowHeight: 20,
    verticalCompact: false,
    preventCollision: true
  };

  let layout = [
    { i: "memo", x: 0, y: 0, w: 10, h: 25 },
    { i: "directory", x: 10, y: 0, w: 5, h: 25, static: true }
  ];

  return (
    <div className="app-container container-fluid">
      <div className="main-section">
        <Alert variant="warning">
          <b>Version 1.0.1</b> : Flower Demo Version 배포가 준비 중입니다.
        </Alert>
        <ReactGridLayout layout={layout} {...defaultProps}>
          {/* <div id="graph" key="graph" className="block" width="100%" /> */}
          <div key="directory" className="block" width="100%">
            <h5 className="sub-title">Directory</h5>
            <Fileview />
          </div>
          <div key="memo" className="block" width="100%">
            <h5 className="sub-title"> Memo </h5>
            <MemoList />
          </div>
        </ReactGridLayout>
      </div>
    </div>
  );
}

export default MainDashboard;
