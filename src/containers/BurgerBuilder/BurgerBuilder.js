import React, { Component } from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        // We don't use this local state anymore => ingredients: null,
        // We don't use this local state anymore => totalPrice: 4,
        // We deleted "purchasable: false" because we will handle the case of enabling/disabling the ORDER button.
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        /*
            - We start adding Redux store for our project and we can see that we fetch the ingredients (which is defined in the state) from a server though we didn't know yet how to handle asynchronous code in Redux so we will comment the code below and hard code the ingredient in the reducer like before, for now at least.
        */  
        // Axios.get('https://react-burger-dev.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //     })
        //     .catch(error => {
        //         this.setState({
        //             error: true
        //         });
        //     });
    }

    updatePurchaseState(ingredients) {
        // eslint-disable-next-line
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0);
        // We use zero to indicate we don't add an outside value on the sum

        // At the end, sum either will be zero indicating no ingredients added or any other value representing the number of ingredients.

        return sum > 0;
        // This will either true or false based on sum > 0 or not.
    }

    // I will delete the code of "addIngredientHandler" and "removeIngredientHandler" now, you can check it it the past commits.

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    // Here we pass the ingredients of the burger to the URL in order to pass them down to Checkout component to render the REAL burger that the user selected.
    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        /*
            - REDUX Update: Here we will substitute every "this.state.ingredients" to be "this.props.ings".
        */
        const disabledInfo = {
            ...this.props.ings
        };
        // eslint-disable-next-line
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
            // disabledInfo[key] should be true or false, if it's true(meaning no ingredients), we should disable.
        }
        // {salad: true, meat: false, ...}
        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price} />;
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, Axios));