import React, { Component } from 'react';
import logo from './logo.svg';
import './ShoppingList.css';

class ShoppingList extends Component {
  render() {
    return (
      <div className="ShoppingList">
        <header className="ShoppingList-header">
          <img src={logo} className="ShoppingList-logo" alt="logo" />
          <h1 className="ShoppingList-title">Welcome to React</h1>
        </header>
        <p className="ShoppingList-intro">
          To get started, edit <code>src/ShoppingList.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default ShoppingList;
