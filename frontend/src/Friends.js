import React, { Component } from 'react';
import logo from './logo.svg';
import './Friends.css';

class Friends extends Component {
  render() {
    return (
      <div className="Friends">
        <header className="Friends-header">
          <img src={logo} className="Friends-logo" alt="logo" />
          <h1 className="Friends-title">Welcome to React</h1>
        </header>
        <p className="Friends-intro">
          To get started, edit <code>src/Friends.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default Friends;
