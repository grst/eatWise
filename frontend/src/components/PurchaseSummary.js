import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react';
import Button from '@material-ui/core/Button';

import store from '../store'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';

import ProductItem from './ProductItem';
import ScoreCard from "./ScoreCard";

const style = {
  button : {
    textAlign: 'center',
    marginBottom: 15
  }
};

@observer
class PurchaseSummary extends Component {
  onClick = () => {
    this.props.history.push("/challenge-a-friend");
  }
  componentDidMount() {
    store.pageTitle = "Purchase summary";
  }
  render() {
    return (
        <div>
          <ScoreCard user={store.user}
                     text1="You earned"
                     text2="Good job!"
                     points={Math.round(store.purchase.basketPoints)}
                     co2={Math.round(store.purchase.basketCO2*100)/100}/>

          <div style={style.button}>
            <Button variant="outlined" onClick={this.onClick}>Challenge a friend</Button>
          </div>

          {store.purchase && store.purchase["boughtItems"] &&
          <div className="PurchaseSummary">

            {store.purchase.boughtItems.map(p =>
                <ListItem key={p.name}>
                  <ProductItem product={p} quantity={p.quantity}/>
                </ListItem>
            )}

          </div>
          }
        </div>
    );
  }
}

export default withRouter(PurchaseSummary);
