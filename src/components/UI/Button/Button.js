import React from 'react';
import classes from './Button.module.css';

const button = (props) => (
    <button className={[classes.Button, classes[props.btnType]].join(' ')} onClick={props.clicked}>{props.children}</button>
);  
// btnType will be danger or success button, we will set it by ourselves.

export default button; 