import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react';

import store from '../store'

@observer
class ChallengeResult extends Component {
  onClick = () => {
    this.props.history.push("/");
  }
  componentDidMount() {
    store.pageTitle = "Challenge summary";
  }
  render() {
    return (
      <div className="ChallengeResult">
        You <b>{store.challengeResult.status}</b>
        <br/>
        In any case you suck!
        <br/>
        <button onClick={this.onClick}>Restart</button>
      </div>
    );
  }
}

export default withRouter(ChallengeResult);
