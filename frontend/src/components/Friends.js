import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import store from '../store'
import api from '../api'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import _ from 'lodash'

const styles = {
  bigAvatar: {
    width: 60,
    height: 60,
  },
  score: {
    fontSize: "1.3em",
    fontWeight: "bold",
  },
  currentUser: {
    opacity: .4
  },
  otherUser: {
  }
};

const Friend = withStyles(styles)(
  ({user, classes, onClick, enabled}) => {
  return (
    <ListItem onClick={onClick} className={enabled ? classes.otherUser : classes.currentUser}>
      <ListItemAvatar>
        <Avatar
          alt={user.name}
          src={user.avatarURL}
          className={classes.bigAvatar}
        >
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={user.username}
        secondary={user.description}
      />
      <div className={classes.score}>
        {user.points}
      </div>
    </ListItem>
  );
});

@withStyles(styles)
@observer
class Friends extends Component {
  challengePicker = (typeof this.props.disableChallenge === "undefined");
  onClick = (user) => {
    if(this.challengePicker && user.id !== store.user.id) {
      store.challengeFriend(user);
      this.props.history.push("/waiting-for-challenge-complete");
    }
  };
  //in challengePicker mode, do not remove own user profile.
  componentDidMount() {
    console.log(store.user.id);
    store.pageTitle = "Challenge a friend";
  }
  render() {
    const filteredUsers = store.users.filter(u => this.challengePicker || u.id !== store.user.id);
    const { classes } = this.props;
    return (
      <div>
        { filteredUsers.length > 0 &&
        <List dense={false}>
          { _.sortBy(filteredUsers, [function(x) {return(-x.points)}]).map(u =>
            <Friend user={u} key={u.id}
                onClick={this.onClick.bind(this, u)}
                enabled={u.id !== store.user.id} />
          )}
        </List>
        }
        { store.otherUsers.length === 0 &&
          <div>Get some friends you looser!</div>
        }
      </div>
    );
  }
}

export default withRouter(Friends);
