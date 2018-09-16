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
import classNames from 'classnames';
import CountUp from 'react-countup';

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
    fontSize: 20,
    marginTop: -100,
    textAlign: 'center',
  },
  text2: {
    fontSize: 20,
    textAlign: 'center',
  },
  textBadge: {
    fontSize: 20,
    textAlign: 'right',
    marginRight: 75,
    marginBottom: -5,
    fontWeight: 'bold',
    fontVariant: "small-caps",
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
    width: 100,
    height: 100,
  },
  avatarLevelImg: {
    width: 64,
    height: 64
  },
  scorePoints: {
    fontSize: 32
  },
  scoreCO2: {
    color: '#777',
    fontSize: 24,
    textAlign: 'center',
    marginTop: -22,
    marginBottom: 40,
  }
};

function ScoreCard({classes, className = "", user, text1, text2, points, co2, textColor}) {
  const badgeText = typeof user.badges === "undefined" ? null : user.badges[0];
  const badgeURL = "/img/badges/" + badgeText + ".png";
  points = typeof points === "undefined" ? user.points : points;
  co2 = typeof co2 === "undefined" ? user.co2 : co2;
  return (
      <Card className={classNames(classes.card, className)}>
        <CardContent>
          <Avatar
              alt={user}
              src={user.avatarURL}
              className={classes.avatarUser}
          />
          <Typography className={classes.title} color="textSecondary">
            {text1}
          </Typography>
          <Typography className={classes.score} color="textSecondary" style={{color: textColor}}>
            <CountUp
              end={Math.round(points)}
              duration={5} />
            <span className={classes.scorePoints}> points</span>
          </Typography>
          <Typography className={classes.scoreCO2} color="textSecondary">
            <CountUp
              end={Math.round(co2 *100)/100}
              duration={5} />
            kg CO₂
          </Typography>
          <Typography className={classes.text2} color="textSecondary">
            {text2}
          </Typography>
          <Typography className={classes.textBadge} color="textSecondary">
            {badgeText}
          </Typography>
        </CardContent>
        <Avatar
            alt="level"
            src={badgeURL}
            className={classes.avatarLevel}
            childrenClassName={classes.avatarLevelImg} />
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
