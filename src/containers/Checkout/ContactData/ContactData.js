import React, { Component } from 'react';

import classes from './ContactData.module.css';
import Axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
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
                value: '',
                validation:{    // To check for formElement Validity
                    required: true
                },
                valid: false,
                touched: false
            },
            street:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            email:{
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod:{
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: '',
                valid: true
            },
        },
        formIsValid: false,
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

    // Function for form validation
    checkValidiy = (value, rules) => {
        // We add the below check as rules parameter can be undefined for the case of dropdown "deliveryMethod".
        if(!rules){
            return true;
        }
        let isValid = false;
        // Checking if there's an empty field
        if (rules.required){
            isValid = value.trim() !== '';  // trim() to remove any potential whitespace at the beginning or end.
            // So isValid is updated to True or False depending on the check (value.trim() !== ''). For example, if the trimmed value is not equal to an empty string, then isValid will be True.
        }
        // Checking if the number is between the minimum number of letters AND the maximum number of them for ZIPCode.
        if(rules.minLength){
            isValid = value.length >= rules.minLength && value.length <= rules.maxLength;
        }

        return isValid;
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm};
        //updatedOrderForm[inputIdentifier] // name, street, zipCode, country ...
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};  // elementType, elementConfig, value

        // Here, we get the value property from updatedFormElement and set it to be the value of the target element. 
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidiy(updatedFormElement.value, updatedFormElement.validation);

        // Update this flag as the user touched the input field. 
        updatedFormElement.touched = true;

        // Return up in the tree
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        // eslint-disable-next-line
        for (let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid
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
                            changed={(event) => this.inputChangeHandler(event, formElement.id)}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}/>
                    ))
                }
                <Button className={classes.Button} disabled={!this.state.formIsValid}>ORDER</Button>
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