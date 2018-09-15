import React, { Component } from 'react';
import logo from './logo.svg';
import './PurchaseSummary.css';

class PurchaseSummary extends Component {
  render() {
    return (
      <div className="PurchaseSummary">
        <header className="PurchaseSummary-header">
          <img src={logo} className="PurchaseSummary-logo" alt="logo" />
          <h1 className="PurchaseSummary-title">Welcome to React</h1>
        </header>
        <p className="PurchaseSummary-intro">
          To get started, edit <code>src/PurchaseSummary.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default PurchaseSummary;
