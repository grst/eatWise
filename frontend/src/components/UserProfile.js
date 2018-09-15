import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import store from '../store'
import NavigationBar from './NavigationBar'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
};

@observer
class UserProfile extends Component {
  render() {
    return (
        <div className="UserProfile">
          <div className={styles.row}>
            <Avatar
              alt="User1"
              src="/img/user1.png"
              className={classNames(styles.avatar, styles.bigAvatar)}
            />
          </div>
          <Link to='/login'>
            <Button variant="outlined">Change your username</Button>
          </Link>
          <div>Username: {store.username}</div>
          <NavigationBar/>
        </div>
    );
  }
}

export default UserProfile;
