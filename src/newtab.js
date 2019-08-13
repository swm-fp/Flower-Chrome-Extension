import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./css/newtab.css";
//import "bootstrap-4-grid/css/grid.min.css";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import NavCustom from "./Components/NavCustom";
import Sidebar from "react-sidebar";

const mql = window.matchMedia(`(min-width: 800px)`);
class NewTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: true
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }
  render() {
    return (
      <div className="bootstrap-wrapper">
        <Sidebar
          sidebar={<h1 class="main-title">Flower</h1>}
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
          styles={{
            sidebar: {
              width: "250px",
              align: "center",
              backgroundColor: "#343a40"
            }
          }}
        >
          <NavCustom />

          <div className="app-container container-fluid">
            <div className="main-section">
              <div id="graph" />
            </div>
          </div>
        </Sidebar>
      </div>
    );
  }
}

ReactDOM.render(<NewTab />, document.getElementById("root"));
registerServiceWorker();
