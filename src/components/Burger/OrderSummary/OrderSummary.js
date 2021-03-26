import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Aux from '../../../hoc/Auxilliary/Auxilliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

	componentDidUpdate(){
		console.log('[OrderSummary] will update');
	}

	render() {

		const ingredientSummary = Object.keys(this.props.ingredients)
			.map(igKey => {
				return (
					<li key={igKey}>
						<span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
					</li>
				);
			});

		return (
			<Aux>
				<h3 style={{ textAlign: 'center' }}>Your Order</h3>
				<p>A delicious burger with the following ingredients:</p>
				<ul style={{ padding: '16px' }}>
					{ingredientSummary}
				</ul>
				<p><strong>Total Price: {this.props.price.toFixed(2)} $</strong></p>
				<p>Continue to Checkout?</p>
				<Button btnType="Danger" clicked={this.props.purchaseCancelled}>Cancel</Button>
				<Button btnType="Success" clicked={this.props.purchaseContinued}>Continue</Button>
			</Aux>
		);
	}

}

OrderSummary.propTypes = {
	ingredients: PropTypes.object.isRequired,
	price: PropTypes.number.isRequired,
	purchaseCancelled: PropTypes.func.isRequired,
	purchaseContinued: PropTypes.func.isRequired
};

export default OrderSummary;