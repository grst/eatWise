import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserProfile extends Component {
  render() {
    return (
      <div className="UserProfile">
        <Link to='/shopping-list'>Start shopping</Link>
      </div>
    );
  }
}

export default UserProfile;
