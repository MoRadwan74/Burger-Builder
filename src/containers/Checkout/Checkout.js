import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: null,
        price: 0
    };

    // We get the ingredients from the URL or Routing rather than a server or a placed data.
    /*
        - We have a problem about showing the totalPrice. Here we can't pass it to "ContactData" (so that it can be shown to the user when he submits his data) because totalPrice is calculated ONLY in "BurgerBuilder" component. So we need a way to bring the totalPrice from the "BurgerBuilder "down to "Checkout" component so that we can pass totalPrice to "ContactData".
    */
    UNSAFE_componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        //Here we are looping through all the ingredients and then pushing down to ingredients array.
        // eslint-disable-next-line
        for(let param of query.entries()){
            // ['salad', '1']
            // As the ingredients array have an element called "totalPrice" which we already pushed to this array in BurgerBuilder. We should check for it in order to separate it from the usual ingredients.
            if(param[0] === 'price'){
                price = param[1];
            }
            else{
                ingredients[param[0]] = +param[1];  // Adding + to param[1] to convert it from string to number
            }
            
        }
        this.setState({ingredients, totalPrice: price});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    CheckoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return(
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} checkoutCancelled={this.checkoutCancelledHandler} checkoutContinued={this.CheckoutContinuedHandler}/> 
                {/* Later, we will use Routing to pass ingredients. */}
                <Route
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)}
                />
                {/*
                    - We spread out the props above so that we can pass the routing props down to ContactData in order to easily after posting the order data to the server go to the main rout which is '/'.

                    - This is an alternative way instead of using the HOC withRouter in ContactData.
                */}
            </div>
        );
    }
}

export default Checkout;