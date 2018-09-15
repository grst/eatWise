import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react';

import store from '../store'

@observer
class Friends extends Component {
  onClick = () => {
    this.props.history.push("/challenge-result");
  }
  render() {
    return (
      <div>
        <button onClick={this.onClick}>Select a friend</button>
        <br/>
        List of friends goes here.
      </div>
    );
  }
}

export default Friends;
