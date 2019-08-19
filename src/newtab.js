import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./css/newtab.css";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import NavCustom from "./Components/NavCustom";
import Sidebar from "react-sidebar";
import MainSectionGrid from "./Components/MainSectionGrid";
import SidebarCustom from "./Components/SidebarCustom";

const mql = window.matchMedia(`(min-width: 800px)`);
class NewTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: true,
      styles: {
        sidebar: {
          width: "240px",
          align: "center"
          //backgroundColor: "#343a40"
        }
      }
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
          sidebar={<SidebarCustom />}
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
          styles={this.state.styles}
        >
          <NavCustom />
          <MainSectionGrid />
        </Sidebar>
      </div>
    );
  }
}

ReactDOM.render(<NewTab />, document.getElementById("root"));
registerServiceWorker();
