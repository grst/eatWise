import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonIcon from '@material-ui/icons/Person';
import ShoppingIcon from '@material-ui/icons/ShoppingCart';

class NavigationBar extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <Paper square style={{ width: 500 }}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          fullWidth
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab icon={<PersonIcon />} label="Profile" />
          <Tab icon={<ShoppingIcon />} label="Start shopping" />
        </Tabs>
      </Paper>
    );
  }
}

export default NavigationBar;
