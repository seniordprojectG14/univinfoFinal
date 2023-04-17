import React from 'react';
import classes from './Card.module.css';

function CustomCard(props) {
  return <div className={classes.card}>{props.children}</div>;
}

export default CustomCard;
