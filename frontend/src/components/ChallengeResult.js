import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react';
import Button from '@material-ui/core/Button';

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
        <Button variant="outlined" onClick={this.onClick}>Restart</Button>
      </div>
    );
  }
}

export default withRouter(ChallengeResult);
