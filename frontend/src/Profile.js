import React, { Component } from 'react';
import logo from './logo.svg';
import './Profile.css';

class Profile extends Component {
  render() {
    return (
      <div className="Profile">
        <header className="Profile-header">
          <img src={logo} className="Profile-logo" alt="logo" />
          <h1 className="Profile-title">Welcome to React</h1>
        </header>
        <p className="Profile-intro">
          To get started, edit <code>src/Profile.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default Profile;
