import React, { Component, Fragment } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import chroma from 'chroma-js';

const RdGreen = chroma.scale(['#33ff00','#aa0000'])
    .mode('lch').colors(21);

function valToColor(val) {
  val = val * 10;
  if(val > 20) val = 20;
  val = Math.round(val);
  const col = RdGreen[val];
  return(col);
}

function ProductItem(props) {
  const p = props.product;
  const imgUrl = '/img/foodIcons/' + p.iconURL

  const styles = {
    item: {
      backgroundColor: valToColor(p.co2_100g),
      marginRight: 22
    }
  };

  const textPrimary = typeof props.quantity === "undefined" ? p.name :
      `${p.name} (${Math.round(p.quantity / 10) / 100} kg)`;
  const textSecondary = typeof props.quantity === "undefined" ? `${p.co2_100g} kg of CO₂ per 100g` :
      Math.round(p.quantity * (p.co2_100g / 100) * 100) / 100 + " kg CO₂";

  return <Fragment>
    <ListItemAvatar>
      <Avatar src={imgUrl}>
      </Avatar>
    </ListItemAvatar>
    <ListItemText
      primary={textPrimary}
      secondary={textSecondary}
    />
    <Avatar style={styles.item}></Avatar>
  </Fragment>
}
export default ProductItem;
