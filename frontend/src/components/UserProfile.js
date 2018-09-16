import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import store from '../store'
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ScoreCard from "./ScoreCard";
import Slide from '@material-ui/core/Slide';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Friends from "./Friends";

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  username: {
  },
  dialog: {
    margin: "10px",
    padding: "0",
  },
  dialogTitle: {
    padding: "10px",
  },
  dialogContent: {
    padding: "0px",
  },
  dialogDescription: {
    padding: "20px",
  },
  friendsTitle: {
    padding: "18px",
    marginBottom: "-21px"
  }
};

@withStyles(styles)
@observer
class UserProfile extends Component {

  state = {
    hasDeclined: false
  }

  componentDidMount() {
    store.pageTitle = "User profile";

    this.interval = setInterval(function() {
      store.checkForOngoingChallenges();
    }, store.updatePeriod);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleDisagree = () => {
    // TODO:
    this.setState({
      hasDeclined: true
    });
  }

  handleAgree = () => {
    this.props.history.push("/shopping-list");
  }

  render() {
    const classes = this.props.classes;
    const challengedBy = store.challengeResult ? (store.challengeResult.playerOne || {}) : {};
    const challengedByName = challengedBy.username;
    const hasDialogOpened = store.isWaitingForPlayerTwo && !store.isPlayerOne && !this.state.hasDeclined;
    // const badge = "foo"
    //          <div style={{...styles.row, ...styles.username}}>
            //{store.username} (<Link to='/login'>Logout</Link>)
            //</div>
    return (
        <div className="UserProfile">
          <ScoreCard
            user={store.user}
            text1="Your Score: "
            points={challengedBy.points}
            className="animated slideInDown"
          />
          <div className="animated slideInUp">
            <h2 style={styles.friendsTitle}>Your friends</h2>
            <Friends disableChallenge="true" animate={false} />
          </div>

      {/*dialog for incoming challenge*/}
      <Dialog
        classes={{
          root: classes.dialog,
          paper: classes.dialog,
        }}
        open={hasDialogOpened}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        animation={Slide}
        transitionDuration={1000}
        >
          <DialogTitle
            id="alert-dialog-title"
            className={classes.dialogTitle}>
            {challengedByName} challenged you!
          </DialogTitle>
            <DialogContent className={classes.dialogContent}>
              <DialogContentText id="alert-dialog-description">
                <ScoreCard user={challengedBy}
                  text1={`${challengedByName}'s score`}
                  points={challengedBy.challengePoints}
                  compact={true} />
                <div className={classes.dialogDescription}>
                  Are you ready to challenge {challengedByName}?
                </div>
              </DialogContentText>
            </DialogContent>
              <DialogActions>
                <Button onClick={this.handleDisagree} color="primary">
                  Decline
                </Button>
                <Button onClick={this.handleAgree} color="primary" autoFocus>
                  Accept
                </Button>
              </DialogActions>
        </Dialog>
        </div>
    );
  }
}

export default UserProfile;
