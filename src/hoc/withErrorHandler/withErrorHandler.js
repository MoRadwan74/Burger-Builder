import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilliary/Auxilliary';

// This is not a functional component, it's just a normal function that returns a functional component.
const withErrorHandler = (WrappedComponent, Axios) => {
    return class extends Component {
        state = {
            error: null
        };
        componentDidMount(){
            Axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            Axios.interceptors.response.use(res => res, error =>{
                this.setState({error: error});
            });
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