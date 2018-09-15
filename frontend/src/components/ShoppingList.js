import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react';

import api from '../api'
import store from '../store'

import classNames from 'classnames';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import ProductItem from './ProductItem';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
  checkoutBar: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  }
});


function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      <ProductItem product={props.data} />
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
      SINGLE
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>
    {props.children}
  </div>;
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

@withStyles(styles)
@observer
class ShoppingList extends Component {

  state = {
    single: "",
    products: [],
  };

  onSelectChanged = (e) => {
    console.log("onSelectChanged.", e);
    this.setState({
      products: [...this.state.products, e]
    })
  }

  onDelete = (item) => {
    console.log("item", item);
    this.setState({
      products: this.state.products.filter(p => p.id !== item.id)
    })
  };

  noOptionsMessage = () => {
    return "No products";
  };

  componentDidMount() {
    store.pageTitle = "Planning";
  }

  onBuy = async () => {
    this.props.history.push("/waiting-for-confirmation");
    await store.buyProducts(this.state.products);
    store.checkForOngoingChallenges();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="ShoppingList">
       <Select
            classes={classes}
            options={store.productWithLabels}
            components={components}
            value={this.state.single}
            onChange={this.onSelectChanged}
            placeholder="Enter your food"
            noOptionsMessage={this.noOptionsMessage}
        />
        <br/>
        <List dense={false}>
          {this.state.products.map(p =>
            <ListItem key={p.id}>
              <ProductItem product={p} />
              <ListItemSecondaryAction onClick={this.onDelete.bind(this, p)}>
                <IconButton aria-label="Delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )}
        </List>

        <div className={classes.checkoutBar}>
          <Button variant="outlined" disabled={this.state.products.length === 0} onClick={this.onBuy}>Buy</Button>
        </div>
      </div>
    );
  }
}

export default withRouter(ShoppingList);
