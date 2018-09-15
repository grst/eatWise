import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import { ClimbingBoxLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import store from '../store'
import {withStyles} from "@material-ui/core";
import queryString from 'query-string'

const styles = {
  loader: {
  },
  sweetLoading: {
    margin: '0 auto',
    position: 'relative',
    height: 200,
    width: 200
  },
  mainDiv: {
    textAlign: "center",
  }
};

class SupermarketConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    store.pageTitle = "Waiting for confirmation";
    const query = queryString.parse(this.props.location.search);
    // just check if set for the sake of simplicity
    if (!query.skipWaiting) {
      setTimeout(() => {
        this.props.history.push("/purchase-summary");
      }, 10 * 1e3);
    }
  }

  render() {
    const { classes } = this.props;

    return (
        <div className={classes.mainDiv}>
          <h3>Contacting your supermarket.</h3>
          <br />
          <div className={classes.sweetLoading}>
            <ClimbingBoxLoader
                className={classes.loader}
                sizeUnit={"px"}
                size={30}
                color={'#123abc'}
                loading={this.state.loading}
            />
          </div>
          <Link to="/purchase-summary">Skip</Link>
        </div>
    )
  }
}

SupermarketConfirmation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SupermarketConfirmation);
