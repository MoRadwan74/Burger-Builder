import React, {Component} from 'react';

import Order from '../../components/Order/Order';
import Axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{

    state = {
        orders: [],
        loading: true
    };

    // We don't manage the orders of the state in the Redux store so far because orders is related to asynchronous code but it will be included in the next update
    componentDidMount(){
        Axios.get('/orders.json')
            .then(res => {
                // We have a problem that the returned order is an object not array. So we need to convert it.
                const fetchedOrders = [];   // The initial array in which the orders will be pushed.
                // eslint-disable-next-line
                for (let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    }); 
                }
                this.setState({loading: false, orders: fetchedOrders});
            })
            .catch(err =>{
                this.setState({loading: false});
            });
    }

    render(){
        return(
            <div>
                {this.state.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price}    
                    /> 
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, Axios);