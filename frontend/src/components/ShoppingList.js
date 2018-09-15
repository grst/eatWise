import React, { Component } from 'react';
import { observer } from 'mobx-react';

import store from '../store'

@observer
class ShoppingList extends Component {
  render() {
    return (
      <div className="ShoppingList">
      </div>
    );
  }
}

export default ShoppingList;
