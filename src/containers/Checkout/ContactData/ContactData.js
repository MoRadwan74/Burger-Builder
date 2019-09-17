import React, { Component } from 'react';

import classes from './ContactData.module.css';
import Axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: ''
            },
            email:{
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: ''
            },
            deliveryMethod:{
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            },
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        // eslint-disable-next-line
        for (let formElementIdentifier in this.state.orderForm){ // formElementIdentifier can be name, street ...
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value; 
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,    // We should calculate the total price on the server not here.
            orderData: formData
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

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm};
        //updatedOrderForm[inputIdentifier] // name, street, zipCode, country ...
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};  // elementType, elementConfig, value

        // Here, we get the value property from updatedFormElement and set it to be the value of the target element. 
        updatedFormElement.value = event.target.value;

        // Return up in the tree
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        this.setState({
            orderForm: updatedOrderForm
        });
    }

    render() {

        const formElementArray = [];
        // eslint-disable-next-line
        for(let key in this.state.orderForm){
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {/* Create the form elements dynamically. */}
                {
                    formElementArray.map(formElement => (
                        <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            changed={(event) => this.inputChangeHandler(event, formElement.id)}/>
                    ))
                }
                <button className={classes.Button}>ORDER</button>
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
/*
    1- Decide which kind of data that we need so that we store it in the state.
    2- Find a way to dynamically generating our form.
    3- Handle the form submission and validity, changing the style based on the validiy for example.

    - We can make a component specified for the input fields themselves with their own styles.
*/