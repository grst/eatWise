import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react';

import store from '../store'

@observer
class ShoppingList extends Component {
  onClick = () => {
    this.props.history.push("/purchase-summary");
  }
  render() {
    return (
      <div className="ShoppingList">
        List of products.
        <br/>
        <button onClick={this.onClick}>Buy</button>
      </div>
    );
  }
}

export default withRouter(ShoppingList);
