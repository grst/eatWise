import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';


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
        <Link to='/shopping-list'>Start shopping</Link>
      </div>
    );
  }
}

export default UserProfile;
