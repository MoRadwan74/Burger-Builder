import React, { Component } from 'react';
import Aux from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        Axios.get('https://react-burger-dev.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(error => {
                this.setState({
                    error: true
                });
            });
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

        this.setState({ purchasable: sum > 0 });
        // This will either true or false based on sum > 0 or not.
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        // To track the price of the constructed Burger
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        // Condition to check if the array "transformedIngredients" is zero or less
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        // To track the price of the constructed Burger
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });

        this.updatePurchaseState(updatedIngredients);
    }

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
        // //alert('You continue!');
        // eslint-disable-next-line
        {/* WE COMMENT THE ABOVE CODE AS WE NO LONGER WANT TO POST TO FIREBASE, WE WANT TO GO TO THE CHECKOUT COMPONENT INSTEAD. NOW IT'S MOVED TO CONTACTDATA*/}
        const queryParams = [];
        // eslint-disable-next-line
        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));  
            // Array of a couple of strings which is propertyName = propertyValue. i.e. salad=2
            // Here, we use "encodeURIComponent" to remove the whitespaces that may occur so that we can put these strings to the URL. (In our case, we don't need that.)
        }
        // To pass the total price down into ContactData in order to show it
        queryParams.push('price=' + this.state.totalPrice);
        
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        // eslint-disable-next-line
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
            // disabledInfo[key] should be true or false, if it's true(meaning no ingredients), we should disable.
        }
        // {salad: true, meat: false, ...}
        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.state.totalPrice} />;
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

export default withErrorHandler(BurgerBuilder, Axios);