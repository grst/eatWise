import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react';
import Button from '@material-ui/core/Button';

import store from '../store'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';

function Friend(props) {
  const u = props.user;
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <FolderIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={u.name}
        secondary={u.description}
      />
    </ListItem>
  );
}

@observer
class Friends extends Component {
  onClick = (user) => {
    console.log("Selected user: ", user);
    this.props.history.push("/challenge-result");
  }
  componentDidMount() {
    store.pageTitle = "Challenge a friend";
  }
  render() {
    return (
      <div>
        { store.friends.length > 0 &&
        <List dense={false}>
          { store.friends.map(u =>
            <Friend user={u} key={u.id} onClick={this.onClick.bind(this, u)} />
          )}
        </List>
        }
        { store.friends.length === 0 &&
          <div>Get some friends you looser!</div>
        }
      </div>
    );
  }
}

export default withRouter(Friends);
