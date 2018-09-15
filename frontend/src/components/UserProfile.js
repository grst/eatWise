import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import store from '../store'
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ScoreCard from "./ScoreCard";

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
  }

  render() {
    return (
        <div className="UserProfile">
          <ScoreCard/>
          <div style={{...styles.row, ...styles.username}}>
            <h3>{store.username}</h3>
            </div>
          <Link to='/login'>
            <Button variant="outlined">Change User</Button>
          </Link>
        </div>
    );
  }
}

export default UserProfile;
