import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { css } from 'react-emotion';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';


const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

@observer
class SupermarketConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  render() {
    return (
      <div className='sweet-loading'>
        <ClipLoader
          className={override}
          sizeUnit={"px"}
          size={150}
          color={'#123abc'}
          loading={this.state.loading}
        />
        <Link to="/purchase-summary">Confirm</Link>
      </div>
    )
  }
}

export default SupermarketConfirmation;
