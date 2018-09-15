import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import Avatar from "@material-ui/core/Avatar/Avatar";
import Typography from '@material-ui/core/Typography';

import store from '../store'


const badgeStyles = {
  badge: {
    fontSize: 18,
  }
};

const UserBadge = withStyles(badgeStyles)(function ({badge, classes}) {
  return (
      <Typography className={classes.badge}>
        {badge}
      </Typography>
  );
});

const userStyles = {
  user: {
    padding: "10px",
  },
  avatar: {
    height: "140px",
    width: "140px",
  },
  userName: {
    fontSize: 20
  },
  userDescription: {
    fontSize: 18,
    fontStyle: "italic",
  },
  userPoints: {
    fontSize: 20,
    fontWeight: "bold",
  }
};

const User = withStyles(userStyles)(function ({user, classes, name}) {
  return (
    <div className={classes.user}>
        <Avatar
            alt="level"
            src={user.avatarURL}
            className={classes.avatar}
        />
      <Typography className={classes.userName}>
        {name}
      </Typography>

      <Typography className={classes.userDescription}>
        {user.description}
      </Typography>

      <Typography className={classes.userPoints}>
        {user.points}
      </Typography>
      {user.badges.map(badge => (
        <UserBadge badge={badge} key={badge} />
      ))}
    </div>
  );
});

const styles = {
  mainDiv: {
    padding: "20px",
    display: 'flex',
    justifyContent: 'center',
    textAlign: "center",
  },
  challengeDiv: {
    width: "100%",
  },
  userContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  statusText: {
    fontSize: 18,
  },
  quoteText: {
    fontSize: 18,
  }
}



@withStyles(styles)
@observer
class ChallengeResult extends Component {
  restartChallenge = () => {
    this.props.history.push("/");
  }
  componentDidMount() {
    store.pageTitle = "Challenge summary";
  }
  render() {
    const classes = this.props.classes;
    console.log(toJS(store.challengeResult));
    const quote = "You're our hero!";
    return (
      <div className={classes.mainDiv}>
      {store.hasChallenge ?
        <div className={classes.challengeDiv}>
        {store.challengeResult.status === "won" ?
          <Typography className={classes.statusText}>
            You <b>{store.challengeResult.status}</b>.
          </Typography>
        :
          <Typography className={classes.statusText}>
            You <b>{store.challengeResult.status}</b>.
            <br />
            Sorry!
          </Typography>
        }
          <div className={classes.userContainer}>
            <User
              user={store.user}
              name="Me"
            />
            <User
              user={store.challengeResult.adversary}
              name={store.challengeResult.adversary.username}
            />
          </div>
          <br/>
          <br/>
          <Typography className={classes.quoteText}>
            {quote}
          </Typography>
          <br/>
          <Button variant="outlined" onClick={this.restartChallenge}>Restart</Button>
        </div>
        :
          <div>
            No active challenge.
            <br />
            <br />
            <Button variant="outlined" onClick={this.restartChallenge}>Start a new challenge.</Button>
          </div>
        }
      </div>
    );
  }
}

export default withRouter(ChallengeResult);
