import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return(
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            {/* Preview of the built burger */}
            <div style={{width:'100%', height:'400px', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            {/* Preview of buttons */}
            <Button btnType='Danger' className={classes.Button}>CANCEL</Button>
            <Button btnType='Success' className={classes.Button}>CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;