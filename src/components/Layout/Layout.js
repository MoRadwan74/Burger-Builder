import React, { Component } from 'react';

import Aux from '../../hoc/Auxilliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () =>{
        this.setState({showSideDrawer: false});
    }

    SideDrawerToggleHandler = () => {
        //this.setState({showSideDrawer: !this.state.showSideDrawer});
        this.setState((prevState) => {
            return{showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar toggled={this.SideDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;