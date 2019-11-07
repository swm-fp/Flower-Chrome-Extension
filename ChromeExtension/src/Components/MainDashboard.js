import React from "react";
import "../css/grid.scss";
import MemoList from "./MemoList";

function MainDashboard(props) {
  return (
    <div className="app-container container-fluid">
      <div className="memo-list">
        <MemoList />
      </div>
    </div>
  );
}

export default MainDashboard;
