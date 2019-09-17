import React from 'react';

import classes from './Input.module.css';

const input = (props) => {

    let inputElement = null;

    // For each element we want to add a special class if it's not valid like a feedback valdiation
    const inputClasses = [classes.InputElement];

    let validationError = null;
    // This check is independant of the type of the input so we need to do it once at the beginning.
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid); // Adding the Invalid CSS if we found out that the element is invalid.
        validationError = <p className={classes.ValidationError}>Please Enter a valid value!</p>
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;

        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;

        case('select'):
            inputElement = <select
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed}>
                {/* Here we created the options dynamically rather than hardcoded them. */}
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>{option.displayValue}</option>
                ))}
            </select>;
            break;

        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
};

export default input;