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

const styles = {
  bigAvatar: {
    width: 60,
    height: 60,
  },
  score: {
    fontSize: "1.3em",
    fontWeight: "bold",
  }
};

const Friend = withStyles(styles)(
  ({user, classes, onClick}) => {
  return (
    <ListItem onClick={onClick}>
      <ListItemAvatar>
        <Avatar
          alt={user.name}
          src={user.avatarURL}
          className={classes.bigAvatar}
        >
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={user.name}
        secondary={user.description}
      />
      <div className={classes.score}>
        {user.id}
      </div>
    </ListItem>
  );
});

@observer
class Friends extends Component {
  onClick = (user) => {
    console.log("Selected user: ", user);
    store.adversaryName = user;
    api.post('/startChallenge', {"Me": store.username, "Adversary": store.adversaryName});
    this.props.history.push("/waiting-for-challenge-complete");
  }
  componentDidMount() {
    store.pageTitle = "Challenge a friend";
  }
  render() {
    return (
      <div>
        { store.otherUsers.length > 0 &&
        <List dense={false}>
          { store.otherUsers.map(u =>
            <Friend user={u} key={u.id} onClick={this.onClick.bind(this, u)} />
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
