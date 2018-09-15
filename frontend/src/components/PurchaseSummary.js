import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react';
import Button from '@material-ui/core/Button';

import store from '../store'

@observer
class PurchaseSummary extends Component {
  onClick = () => {
    this.props.history.push("/challenge-a-friend");
  }
  componentDidMount() {
    store.pageTitle = "Purchase summary";
  }
  render() {
        //{store.purchase.map(e }
    return (
      <div className="PurchaseSummary">
        <br/>
        Total points.
        <br/>
        <Button variant="outlined" onClick={this.onClick}>Challenge a friend</Button>
      </div>
    );
  }
}

export default withRouter(PurchaseSummary);
