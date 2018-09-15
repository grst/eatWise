import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PersonIcon from '@material-ui/icons/Person';
import ShoppingIcon from '@material-ui/icons/ShoppingCart';
import {Link} from "react-router-dom";

const styles = {
  root: {
      width: '100%',
      position: 'fixed',
      bottom: 0
  },
};

class NavigationBar extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <Link to='/'>
          <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
        </Link>
        <Link to='/shopping-list'>
          <BottomNavigationAction label="Shopping" icon={<ShoppingIcon />} />
        </Link>
      </BottomNavigation>
    );
  }
}

NavigationBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavigationBar);
