import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import store from '../store'
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ScoreCard from "./ScoreCard";
import PropTypes from 'prop-types';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Close';
import api from "../api";
import {observe, runInAction} from "mobx";

import { PacmanLoader } from 'react-spinners';

const styles = {
  avatar: {
    margin: 10,
  },
  checkAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: '#33ff00'
  },
  cancelAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: '#dd0000',
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  loader: {
    padding: "2em",
  },
  pendingChallenge: {
    textAlign: 'center'
  }
};

@observer
class PendingChallenge extends Component {

  state = {
    loading: true,
  }

  //constructor(props){
    //super(props)
    //this.ref = React.createRef()
  //}

  componentDidMount() {
    store.pageTitle = `${store.otherPlayer.username}'s challenge`;
    this.interval = setInterval(function() {
      store.checkForOngoingChallenges();
    }, store.updatePeriod);
    this.cancelObservation = observe(store.challengeResult, () => {
      console.log("FF", store.challengeResult);
      if (store.isChallengeFinished) {
        this.props.history.push("/challenge-result");
        this.componentWillUnmount(); // be sure to avoid any overlaps
      }
    });
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    if (this.cancelObservation) {
      this.cancelObservation();
      this.cancelObservation = null;
    }
  }

  render() {
    const { classes } = this.props;
    const username = store.otherPlayer;
    const size = document.body.offsetWidth * 0.2;
    return (
        <div className={classes.pendingChallenge}>
          <h2>{username} has been challenged.</h2>
          <br />
          You will be notified once {username} completed the challenge!
          <div
              className={classes.loader}
          >
            <PacmanLoader
              sizeUnit={"px"}
              size={size}
              color={'#123abc'}
              loading={this.state.loading}
            />
          </div>
        </div>
    );
  }
}

PendingChallenge.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(PendingChallenge)
