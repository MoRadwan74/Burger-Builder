import React from 'react';
import classes from './Burger.module.css';
import BurgerIndgredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) =>{
    let transformdIngredients = Object.keys(props.ingredients)
        .map(igKey =>{
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIndgredient key={igKey + i} type={igKey}/>;
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
        if(transformdIngredients.length === 0){
            transformdIngredients = <p>Please start adding ingredients!</p>;
        }
    return(
        <div className={classes.Burger}>
            <BurgerIndgredient type="bread-top"/>
            {transformdIngredients}
            <BurgerIndgredient type="bread-bottom"/>
        </div>
    );
};

export default burger;