import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react';

import store from '../store'
import NavigationBar from "./NavigationBar";

@observer
class ShoppingList extends Component {
  onClick = () => {
    this.props.history.push("/purchase-summary");
  }
  render() {
    return (
      <div className="ShoppingList">
        List of products.
        {store.products.map(e =>
          <div id={e.name}> {e.name} </div>
        )}
        <br/>
        <button onClick={this.onClick}>Buy</button>
        <NavigationBar/>
      </div>
    );
  }
}

export default withRouter(ShoppingList);
