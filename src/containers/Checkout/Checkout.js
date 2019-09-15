import React, {Component} from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheesed: 1,
            bacon: 1
        }
    };

    render(){
        return(
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}/> {/* Later, we will use Routing to pass ingredients. */}
            </div>
        );
    }
}

export default Checkout;