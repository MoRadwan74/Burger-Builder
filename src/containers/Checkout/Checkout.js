import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    // We get the ingredients from the URL or Routing rather than a server or a placed data.
    /*
        - We have a problem about showing the totalPrice. Here we can't pass it to "ContactData" (so that it can be shown to the user when he submits his data) because totalPrice is calculated ONLY in "BurgerBuilder" component. So we need a way to bring the totalPrice from the "BurgerBuilder "down to "Checkout" component so that we can pass totalPrice to "ContactData".
    */

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    CheckoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return(
            <div>
                <CheckoutSummary ingredients={this.props.ings} checkoutCancelled={this.checkoutCancelledHandler} checkoutContinued={this.CheckoutContinuedHandler}/> 
                {/* 
                    - Later, we will use Routing to pass ingredients. 
                    - Now using Redux we don't need this trick of passing the ingredients through Route,
                    Code:
                    <Route
                        path={this.props.match.path + '/contact-data'} 
                        render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)}
                    />
                    - We now have our Redux store that we can access inside "ContactData" component with connect.
                */}
                <Route
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData}
                />
                {/*
                    - We spread out the props above so that we can pass the routing props down to ContactData in order to easily after posting the order data to the server go to the main rout which is '/'.

                    - This is an alternative way instead of using the HOC withRouter in ContactData.
                */}
            </div>
        );
    }
}

// We don't dispatch here anything so we will not use it.
const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

export default connect(mapStateToProps)(Checkout);