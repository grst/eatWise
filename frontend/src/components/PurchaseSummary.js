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
  onChallenge = () => {
    this.props.history.push("/challenge-a-friend");
  }
  onSeeResults = () => {
    this.props.history.push("/challenge-result");
  }
  componentDidMount() {
    store.pageTitle = "Purchase summary";
  }
  render() {
    let hasChallenge = false;
    const points = Math.round(store.purchase.basketPoints);
    const text1 = "You " + ((points < 0) ? "lost" : "earned");
    const text2 = points < 0 ? "Try again!" : "Good job!";
    const textColor = points < 0 ? "#aa0000" : "#00aa00";
    return (
        <div>
          <ScoreCard user={store.user}
                     text1={text1}
                     text2={text2}
                     textColor={textColor}
                     points={Math.abs(Math.round(store.purchase.basketPoints))}
                     co2={Math.round(store.purchase.basketCO2*100)/100}/>

          <div style={style.button}>

            { store.hasChallenge ?
            <Button variant="outlined" onClick={this.onSeeResults}>See results</Button>
            :
            <Button variant="outlined" onClick={this.onChallenge}>Challenge a friend</Button>
            }
          </div>

          {/*{store.purchase && store.purchase["boughtItems"] &&*/}
          {/*<div className="PurchaseSummary">*/}

            {/*{store.purchase.boughtItems.map(p =>*/}
                {/*<ListItem key={p.name}>*/}
                  {/*<ProductItem product={p} quantity={p.quantity}/>*/}
                {/*</ListItem>*/}
            {/*)}*/}

          {/*</div>*/}
          {/*}*/}
        </div>
    );
  }
}

export default withRouter(PurchaseSummary);
