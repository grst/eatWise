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
import {runInAction} from "mobx";

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
};

@observer
class PendingChallenge extends Component {

  componentDidMount() {
    store.pageTitle = `${store.adversary.username} has been challenged. `;
    this.interval = setInterval(function() {
      store.updateChallenge();
    }, store.updatePeriod);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { classes } = this.props;
    const username = store.adversary.username;
    return (
        <div className="PendingChallenge">
          <h2>{username} has been challenged.</h2>
          <br/ >
          You will be notified once {username} completed the challenge!
        </div>
    );
  }
}

PendingChallenge.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(PendingChallenge)
