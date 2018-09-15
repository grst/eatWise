import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react';
import Button from '@material-ui/core/Button';

import store from '../store'

@observer
class WaitingForSupermarket extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.history.push("/purchase-summary");
    }, 200);
    store.pageTitle = "Waiting";
  }
  render() {
    return (
      <div>
        Waiting for data transmission from your local supermarket.
      </div>
    );
  }
}

export default withRouter(WaitingForSupermarket);
