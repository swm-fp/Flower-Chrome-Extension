import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Flower Demo Version</h1>
        </header>
        <p className="App-intro">
          새로운 북마크 서비스를 사용해보세요.
        </p>
      </div>
    );
  }
}

export default App;
