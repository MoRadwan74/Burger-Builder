import React from 'react';
import classes from './Burger.module.css';
import BurgerIndgredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
	// transform the object (ingredients) ==> the array (transformedIngredients) to manipulate it easily.
	/*
    Update: When adding ingredients from BurgerBuilder to ContactData:
        - We used componentDidMount in Checkout which throws an error here in "Burger" because the ingredients at "Checkout" are null and we set them after mounting the component (You can check this in Checkout component) which may cause to pass the ingredients as null down to "ContactData". 
        
        - So instead of using the legacy "componentWillMount" we added a condition here not to evalute the code of transforming ingredients unless it's not true (In other words, there're actual data).
    */
	let transformedIngredients = null;
	if (props.ingredients) {
		transformedIngredients = Object.keys(props.ingredients)
			.map(igKey => {
				return [...Array(props.ingredients[igKey])].map((_, i) => {
					return <BurgerIndgredient key={igKey + i} type={igKey} />;
				});
			})
			.reduce((arr, el) => {
				return arr.concat(el);
			}, []);
		if (transformedIngredients.length === 0) {
			transformedIngredients = <p>Please start adding ingredients!</p>;
		}
		return (
			<div className={classes.Burger}>
				<BurgerIndgredient type="bread-top" />
				{transformedIngredients}
				<BurgerIndgredient type="bread-bottom" />
			</div>
		);
	}
};

export default burger;