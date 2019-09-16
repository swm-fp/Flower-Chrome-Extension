import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import Sidebar from "react-sidebar";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/newtab.css";
import NavCustom from "./Components/NavCustom";
import MainDashboard from "./Components/MainDashboard";
import SidebarCustom from "./Components/SidebarCustom";

const mql = window.matchMedia(`(min-width: 800px)`);

function NewTab(props) {
  const [sidebarDocked, setSidebarDocked] = useState(mql.matches);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const styles = { sidebar: { width: "180px", align: "center" } };
  useEffect(() => {
    mql.addListener(mediaQueryChanged);
    return () => {
      mql.removeListener(mediaQueryChanged);
    };
  });

  const onSetSidebarOpen = open => {
    setSidebarOpen(open);
  };

  const mediaQueryChanged = () => {
    setSidebarDocked(mql.matches);
    setSidebarOpen(false);
  };

  return (
    <div className="bootstrap-wrapper">
      <Sidebar
        className="sidebar"
        sidebar={<SidebarCustom />}
        open={sidebarOpen}
        docked={sidebarDocked}
        onSetOpen={onSetSidebarOpen}
        styles={styles}
      >
        <NavCustom />
        <Route path="/" component={MainDashboard} />
      </Sidebar>
    </div>
  );
}

ReactDOM.render(
  <BrowserRouter>
    <NewTab />,
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
