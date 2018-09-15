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
import HeaderBar from './HeaderBar'
import ScoreCard from "./ScoreCard";

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 128,
    height: 128,
  },
  username: {
  }
};

@observer
class UserProfile extends Component {
  render() {
    return (
        <div className="UserProfile">
                  <HeaderBar />

          <div style={styles.row}>
            <Avatar
              alt="User1"
              src="/img/user1.png"
              style={{...styles.avatar, ...styles.bigAvatar}}
            />
          </div>
          <ScoreCard/>
          <div style={{...styles.row, ...styles.username}}>
            <h3>{store.username}</h3>
            </div>
          <hr />
          <Link to='/login'>
            <Button variant="outlined">Change User</Button>
          </Link>
          <NavigationBar/>
        </div>
    );
  }
}

export default UserProfile;
