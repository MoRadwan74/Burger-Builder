import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilliary/Auxilliary';

// This is not a functional component, it's just a normal JS function that returns a functional component.
const withErrorHandler = (WrappedComponent, Axios) => {
    return class extends Component {

        // We use "constructor" method because we want to execute the code below before the child component is rendered so that we can catch the request/response before it goes to/comes from the server(this process happens in BurgerBuilder component).
        constructor(props){
            super(props);
            this.reqInterceptor = Axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = Axios.interceptors.response.use(res => res, error =>{
                this.setState({error: error});
            });
        }

        state = {
            error: null
        };

        /* 
        - We created "withErrorHandler" component so that we can handle the errors happened in the WrappedComponent and we user Axios interceptors to handle a case in "BurgerBuilder".
        
        - We need to eject these interceptors after using this component for each WrappedComponent(for example, "BurgerBuilder") so that each time we use it for another component, we didn't create them unnecessarily.

        - So we eject them in "componentWillUnmount" lifecycle method.
        */
        componentWillUnmount(){
            Axios.interceptors.request.eject(this.reqInterceptor);
            Axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () =>{
            this.setState({error: null});
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;