import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxilliary/Auxilliary';
import PropTypes from 'prop-types';

const sideDrawer = (props) => {
	//... Attach some CSS to play with some animation when the drawer is shown.
	let attachedClasses = [classes.SideDrawer, classes.Close];
	if (props.open){
		attachedClasses = [classes.SideDrawer, classes.Open];
	}
	return (
		<Aux>
			<Backdrop show={props.open} clicked={props.closed}/>
			<div className={attachedClasses.join(' ')}>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems />
				</nav>
			</div>
		</Aux>
	);
};

sideDrawer.propTypes = {
	open: PropTypes.bool.isRequired,
	closed: PropTypes.func.isRequired
};

export default sideDrawer;