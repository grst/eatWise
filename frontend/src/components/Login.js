import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import store from '../store'

@observer
class Login extends Component {
  onKeyup = (e) => {
    store.username = e.target.value;
  }
  render() {
    return (
      <div className="Login">
        <input value={store.username} onChange={this.onKeyup} />
        <br/>
        <Link to='/shopping-list'>Back to my profile</Link>
        <br/>
        Username: {store.username}
      </div>
    );
  }
}

export default Login;
