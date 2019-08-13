import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./css/newtab.css";
//import "bootstrap-4-grid/css/grid.min.css";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import NavCustom from "./Components/NavCustom";

class NewTab extends Component {
  render() {
    return (
      <div className="h-100 bootstrap-wrapper">
        <NavCustom />
        <div className="h-100 app-container container-fluid">
          <div className="row h-100">
            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
              <h4>NAV</h4>
            </div>
            <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
              <div className="row h-100">
                <div
                  id="graph"
                  className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<NewTab />, document.getElementById("root"));
registerServiceWorker();
