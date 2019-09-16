import React, { Component } from 'react';

import classes from './ContactData.module.css';
import Axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,    // We should calculate the total price on the server not here.
            // Some dummy order data (Later, we will add a form to submit this data by the user.)
            customer: {
                name: 'Mohamed Radwan',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '41351',
                    country: 'Egypt'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        };
        Axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="text" name="email" placeholder="Your Mail" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                <button className={classes.Button} onClick={this.orderHandler}>ORDER</button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;