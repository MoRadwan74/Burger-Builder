import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import PropTypes from 'prop-types';

const toolbar = (props) =>(
	<header className={classes.Toolbar}>
		<div onClick={props.toggled} className={classes.DrawerToggle}>
			<div></div>
			<div></div>
			<div></div>
		</div>
		<div className={classes.Logo}>
			<Logo/>
		</div>
		<nav className={classes.DesktopOnly}>
			<NavigationItems></NavigationItems>
		</nav>
	</header>
);

toolbar.propTypes = {
	toggled: PropTypes.func.isRequired
};

export default toolbar;