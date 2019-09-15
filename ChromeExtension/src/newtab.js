import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./css/newtab.css";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import NavCustom from "./Components/NavCustom";
import Sidebar from "react-sidebar";
import MainSectionGrid from "./Components/MainSectionGrid";
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
        <MainSectionGrid />
      </Sidebar>
    </div>
  );
}

ReactDOM.render(<NewTab />, document.getElementById("root"));
registerServiceWorker();
