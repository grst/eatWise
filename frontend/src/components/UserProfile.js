import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { observer } from 'mobx-react';
import store from '../store'

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
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
            className={styles.bigAvatar}
          />
        </div>
        <Link to='/shopping-list'>
          <Button variant="outlined">Start shopping</Button>
        </Link>
        <br/>
        <Link to='/login'>
          <Button variant="outlined">Change your username</Button>
        </Link>
        <div>Username: {store.username}</div>
      </div>
    );
  }
}

export default UserProfile;
