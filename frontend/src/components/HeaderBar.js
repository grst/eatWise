import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBack';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    color: '#ffffff',
  },
  userButton: {
    color: '#ffffff'
  }
};

class MenuAppBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
  };

  // handleMenu = event => {
  //   this.setState({ anchorEl: event.currentTarget });
  // };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Link to="/">
            <IconButton className={classes.menuButton} aria-label="Menu">
              <BackIcon />
            </IconButton>
            </Link>
            <Typography variant="title" color="inherit" className={classes.grow}>
              Eco.li
            </Typography>
            {auth && (
              <div>
                <Link to="/profile">
                  <IconButton>
                    <AccountCircle className={classes.userButton}/>
                  </IconButton>
                </Link>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);
