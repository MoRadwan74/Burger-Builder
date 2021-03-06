import React, { Component } from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxilliary/Auxilliary';
import Backdrop from '../Backdrop/Backdrop';
import PropTypes from 'prop-types';

class Modal extends Component {
    
	shouldComponentUpdate(nextProps){
		return nextProps.show !== this.props.show || (this.props.show && nextProps.children !== this.props.children);
	}

	render() {
		const {show, modalClosed, children} = this.props;
		return (
			<Aux>
				<Backdrop show={show} clicked={modalClosed} />
				<div
					className={classes.Modal}
					style={{
						transform: show ? 'translateY(0)' : 'translateY(-100vh)',
						opacity: show ? '1' : '0'
					}}>
					{children}
				</div>
			</Aux>
		);
	}
}

Modal.propTypes = {
	show: PropTypes.bool,
	modalClosed: PropTypes.func,
	children: PropTypes.any
};

export default Modal;