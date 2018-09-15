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
class IncomingChallenge extends Component {
  render() {
    const { classes } = this.props;
    return (
        <div className="IncomingChallenge">
          <ScoreCard/>
          <h2>Can you do better?</h2>
          <div className={classes.row}>
            <Avatar className={classes.checkAvatar}>
              <CheckIcon />
            </Avatar>
            <Avatar className={classes.cancelAvatar}>
              <CancelIcon />
            </Avatar>
          </div>
        </div>
    );
  }
}

IncomingChallenge.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(IncomingChallenge)
