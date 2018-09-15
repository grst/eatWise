import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


import Avatar from "@material-ui/core/Avatar/Avatar";
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

import store from '../store'


const badgeStyles = {
  badge: {
    fontSize: 18,
  },
  img: {
    display: "block",
    height: 35,
    width: 35,
  }
};

const UserBadge = withStyles(badgeStyles)(function ({badge, classes, className}) {
  const badgeURL = "/img/badges/" + badge + ".png";
      //<Typography className={classes.badge}>
        //{badge}
      //</Typography>
  return (
    <div className={className}>
      <img src={badgeURL} className={classes.img} />
    </div>
  );
});

const userStyles = theme => ({
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
    fontSize: 30,
    fontWeight: "bold",
  },
  co2: {
    fontSize: 20,
  },
  badge: {
    top: 100,
    right: 5,
    fontSize: 16,
    width: 40,
    height: 40,
    backgroundColor: theme.palette.grey[300],
  },
});

const User = withStyles(userStyles)(function ({user, classes, name}) {
  return (
    <div className={classes.user}>
      <Badge color="primary"
        badgeContent={
        (<UserBadge badge={user.badges[0]} />
        )}
        classes={{badge: classes.badge}}>
        <Avatar
            alt="level"
            src={user.avatarURL}
            className={classes.avatar}
        />
      </Badge>
      <Typography className={classes.userName}>
        {name}
      </Typography>

      <Typography className={classes.userDescription}>
        {user.description}
      </Typography>

      <Typography className={classes.userPoints}>
        {user.points}
      </Typography>

      <Typography className={classes.co2}>
        {user.co2} kg
      </Typography>

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
  },
  winnerImg: {
    margin: "0 auto",
    display: "block",
    padding: "10px",
    width: "100%",
  },
  looserImg: {
    display: "block",
    margin: "0 auto",
    padding: "10px",
    height: "200px",
  },
}

@withStyles(styles)
@observer
class ChallengeResult extends Component {
  restartChallenge = () => {
    this.props.history.push("/");
  }
  componentDidMount() {
    store.pageTitle = "Challenge results";
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
            <img alt="winner" src="/img/result/winner.gif" className={classes.winnerImg} />
          </Typography>
        :
          <Typography className={classes.statusText}>
            You <b>{store.challengeResult.status}</b>.
            <img alt="looser" src="/img/result/looser.gif" className={classes.looserImg} />
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
