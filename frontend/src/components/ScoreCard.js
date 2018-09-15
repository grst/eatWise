import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import store from '../store'
import 'typeface-oswald'
import Avatar from "@material-ui/core/Avatar/Avatar";


const styles = {
  card: {
    minWidth: 275,
    margin: "40px 60px",
    overflow: 'visible',
    position: 'relative',
    marginTop: 60,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    marginTop: -100,
    textAlign: 'center',
  },
  pos: {
    marginBottom: 12,
  },
  score: {
    fontFamily: "oswald",
    color: "blue",
    fontSize: 68,
    width: '100%',
    textAlign: 'center',
  },
  avatarUser: {
    width: 100,
    height: 100,
    margin: 10,
    position: 'relative',
    left: -64,
    top: -64
  },
  avatarLevel: {
    margin: 10,
    color: '#fff',
    backgroundColor: '#33ff00',
    fontFamily: "oswald",
    fontWeight: 'bold',
    position: 'absolute',
    right: -30,
    bottom: -30,
    width: 80,
    height: 80,
  },
  scorePoints: {
    fontSize: 32
  },
  scoreCO2: {
    color: '#777',
    fontSize: 24,
    textAlign: 'left'
  }
};

function ScoreCard(props) {
  const {classes} = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
      <Card className={classes.card}>
        <CardContent>
          <Avatar
              alt="User1"
              src="/img/user1.png"
              className={classes.avatarUser}
          />
          <Typography className={classes.title} color="textSecondary">
            Your Score:
          </Typography>
          <Typography className={classes.score} color="textSecondary">
            {store.currentScore} <span className={classes.scorePoints}>points</span>
          </Typography>
          <Typography className={classes.scoreCO2} color="textSecondary">
            {store.currentCO2} kg CO2
          </Typography>
        </CardContent>
        <Avatar
            alt="level"
            className={classes.avatarLevel}>1</Avatar>
        {/*<CardActions>*/}
        {/*<Button size="small">Learn More</Button>*/}
        {/*</CardActions>*/}
      </Card>
  );
}

ScoreCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScoreCard);
