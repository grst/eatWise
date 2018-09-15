import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react';

import store from '../store'

@observer
class Friends extends Component {
  onClick = () => {
    this.props.history.push("/challenge-result");
  }
  componentDidMount() {
    store.pageTitle = "Challenge a friend";
  }
  render() {
    return (
      <div>
        <button onClick={this.onClick}>Select a friend</button>
        <br/>
        List of friends goes here.
        { store.friends }
      </div>
    );
  }
}

export default withRouter(Friends);
