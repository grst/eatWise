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
    const avatar = "/img/avatars/" + store.username.toLowerCase() + ".jpg";
    // const badge = "img/badges/" + store.user.badges[0] + ".jpg";
    const badge = "foo"
    return (
        <div className="UserProfile">
          <ScoreCard user={store.username}
                     score={store.user.points}
                     avatar={avatar}
                     badge={badge}
                     CO2={store.user.co2}
                     text1="Your Score: "/>
          <div style={{...styles.row, ...styles.username}}>
            {store.username} (<Link to='/login'>Logout</Link>)
            </div>

        </div>
    );
  }
}

export default UserProfile;
