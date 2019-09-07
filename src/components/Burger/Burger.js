import React from 'react';
import classes from './Burger.module.css';
import BurgerIndgredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) =>{
    // transform the object (ingredients) ==> the array (transformedIngredients) to manipulate it easily.
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey =>{
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIndgredient key={igKey + i} type={igKey}/>;
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
        if(transformedIngredients.length === 0){
            transformedIngredients = <p>Please start adding ingredients!</p>;
        }
    return(
        <div className={classes.Burger}>
            <BurgerIndgredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIndgredient type="bread-bottom"/>
        </div>
    );
};

export default burger;