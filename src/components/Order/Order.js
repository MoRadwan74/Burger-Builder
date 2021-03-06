import React from 'react';

import classes from './Order.module.css';

const order = (props) => {

	// We can use the same logic of transforming object into an array that is used before in "Burger" but this is another way.
	const ingredients = [];

	// eslint-disable-next-line
    for(let ingredientName in props.ingredients){
		ingredients.push(
			{
				name: ingredientName, 
				amount: props.ingredients[ingredientName]
			}
		);
	}

	// Return span for each ingredient
	const ingredientOutput = ingredients.map(ig => {
		return <span 
			style={{
				textTransform: 'capitalize',
				display: 'inline-block',
				margin: '0 8px',
				border: '1px solid #ccc',
				padding: '5px'
			}}
			key={ig.name}>{ig.name} ({ig.amount})</span>;
	});

	return (
		<div className={classes.Order}>
			<p><strong>Ingredients:</strong> {ingredientOutput}</p>
			<p>Price: <strong>{props.price.toFixed(2)} $</strong></p>
		</div>
	);
};

export default order;