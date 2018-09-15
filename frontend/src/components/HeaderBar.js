import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import store from '../store'

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
import Avatar from '@material-ui/core/Avatar';

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

@observer
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
    const isRoot = this.props.location.pathname === "/";

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Link to="/">
            { isRoot ||
              <IconButton className={classes.menuButton} aria-label="Menu">
                <BackIcon />
              </IconButton>
            }
            </Link>
            <Typography variant="title" color="inherit" className={classes.grow}>
              Eco.li - {store.pageTitle}
            </Typography>
            {auth && (
              <div>
                <Link to="/profile">
                  <IconButton>
                    <Avatar
                      alt={store.user.name}
                      className={classes.userButton}
                      src={store.user.avatarURL}
                    />
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

export default withRouter(withStyles(styles)(MenuAppBar));
