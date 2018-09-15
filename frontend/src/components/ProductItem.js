import React, { Component, Fragment } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import chroma from 'chroma-js';

// const RdGreen = chroma.scale(['#33ff00','#aa0000'])
//     .mode('lch').colors(21);

function valToIcon(val) {
  const icons = [
      "1.png", "2.png", "3.png", "4.png", "5.png"
  ];
  val = val * 3;
  if(val > 4) val = 4;
  val = Math.round(val);
  return "img/moodIcons/" + icons[val];
}

function ProductItem(props) {
  const p = props.product;
  const imgUrl = '/img/foodIcons/' + p.iconURL

  const styles = {
    item: {
      marginRight: 22,
      width: 44,
      height: 40
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
    <img style={styles.item} src={valToIcon(p.co2_100g)}/>
  </Fragment>
}
export default ProductItem;
