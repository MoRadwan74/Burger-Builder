import React from 'react';
import classes from './Backdrop.module.css';
import PropTypes from 'prop-types';

const backdrop = (props) => (
	props.show && <div className={classes.Backdrop} onClick={props.clicked}></div>
);

backdrop.propTypes = {
	show: PropTypes.bool,
	clicked: PropTypes.func
};

export default backdrop;