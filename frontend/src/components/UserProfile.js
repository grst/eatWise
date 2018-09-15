import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import store from '../store'
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ScoreCard from "./ScoreCard";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  username: {
  }
};

@observer
class UserProfile extends Component {

  componentDidMount() {
    store.pageTitle = "User profile";

    this.interval = setInterval(function() {
      store.checkForOngoingChallenges();
    }, store.updatePeriod);
  }

  state = {
    hasDialogOpened: false,
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleDisagree = () => {

  }

  handleAgree = () => {

  }

  render() {
    const challengedBy = store.challengeResult ? (store.challengeResult.challengedBy || {}) : {};
    const challengedByName = challengedBy.username;
    // const badge = "foo"
    return (
        <div className="UserProfile">
          <ScoreCard
            user={store.user}
            text1="Your Score: "
          />
          <div style={{...styles.row, ...styles.username}}>
            {store.username} (<Link to='/login'>Logout</Link>)
            </div>
          {store.challengeResult.thisUserWasChallenged === true &&
              <div>
                You are being challenged by {store.challengedBy}.
              </div>
          }
      <Dialog
          open={this.state.hasDialogOpened}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{`Accept ${challengedByName}`}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <ScoreCard user={challengedBy} text1={`${challengedByName}'s score`} />
                Are you ready to challenge {challengedByName}?
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
