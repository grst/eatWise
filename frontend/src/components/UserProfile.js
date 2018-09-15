import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import store from '../store'

@observer
class UserProfile extends Component {
  render() {
    return (
      <div className="UserProfile">
        <Link to='/shopping-list'>Start shopping</Link>
        <br/>
        <Link to='/login'>Change your username</Link>
        <div>Username: {store.username}</div>
      </div>
    );
  }
}

export default UserProfile;
