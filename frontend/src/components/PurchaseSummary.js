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
import SendIcon from '@material-ui/icons/Send';
import CachedIcon from '@material-ui/icons/Cached';


import ProductItem from './ProductItem';
import ScoreCard from "./ScoreCard";
import ShoppingIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {withStyles} from "@material-ui/core";

const styles = theme => ({
  button : {
    textAlign: 'center',
    marginBottom: 15,
    backgroundColor: "#0cbd00"
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

@withStyles(styles)
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
    const { classes } = this.props;
    const points = Math.round(store.purchase.basketPoints);
    const text1 = "You " + ((points < 0) ? "lost" : "earned");
    const text2 = points < 0 ? "Try again!" : "Good job!";
    const textColor = points < 0 ? "#aa0000" : "#00aa00";
    return (
        <div>
          <ScoreCard user={store.user}
                    className="animated slideInDown"
                     text1={text1}
                     text2={text2}
                     textColor={textColor}
                     points={Math.abs(Math.round(store.purchase.basketPoints))}
                     co2={Math.round(store.purchase.basketCO2*100)/100}/>

          <div className="animated slideInUp">
            <div>
              {store.hasChallenge && !store.isPlayerOne ?
              <Button variant="extendedFab" aria-label="Delete" className={classes.button}
                      onClick={this.onSeeResults}>
                <CachedIcon className={classes.extendedIcon}/>
                See results
              </Button>
              : <Button variant="extendedFab" aria-label="Delete" className={classes.button}
                      onClick={this.onChallenge}>
                <SendIcon className={classes.extendedIcon} />
                Challenge a friend
              </Button>}
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
        </div>
    );
  }
}

export default withRouter(PurchaseSummary);
