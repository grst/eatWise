import React, { Component } from 'react';
import logo from './logo.svg';
import './ChallengeResult.css';

class ChallengeResult extends Component {
  render() {
    return (
      <div className="ChallengeResult">
        <header className="ChallengeResult-header">
          <img src={logo} className="ChallengeResult-logo" alt="logo" />
          <h1 className="ChallengeResult-title">Welcome to React</h1>
        </header>
        <p className="ChallengeResult-intro">
          To get started, edit <code>src/ChallengeResult.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default ChallengeResult;
