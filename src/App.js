import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginButton from "./LoginButton";
import TestButton from "./TestButton";
import GRAPH from "./GraphGen";
import BMButton from "./BMButton";
import "bootstrap-4-grid/css/grid.min.css";

class App extends Component {
  render() {
    return (
      <div className="h-100 bootstrap-wrapper">
        <div className="h-100 app-container container-fluid">
          <div className="row">
            <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
              <h1>FLOWER</h1>
            </div>
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 buttons-right">
              <BMButton />
              <GRAPH />
              <LoginButton />
              <TestButton />
            </div>
          </div>
          <div className="row h-100">
            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
              <h4>NAV</h4>
              <p>Option1</p>
              <p>Option1</p>
              <p>Option1</p>
              <p>Option1</p>
              <p>Option1</p>
              <p>Option1</p>
            </div>
            <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
              <div className="row h-100">
                <div
                  id="graph"
                  className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <h4>Graph</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <h4>Options</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
