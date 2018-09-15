import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react';

import store from '../store'

@observer
class PurchaseSummary extends Component {
  onClick = () => {
    this.props.history.push("/challenge-a-friend");
  }
  render() {
    return (
      <div className="PurchaseSummary">
        List of products..
        {store.purchase}
        <br/>
        Total points.
        <br/>
        <button onClick={this.onClick}>Challenge a friend</button>
      </div>
    );
  }
}

export default withRouter(PurchaseSummary);
