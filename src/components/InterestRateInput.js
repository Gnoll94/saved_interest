import React from 'react';
import {Input} from "./Input";

const interestRateRegex = RegExp('^\\d{1,2}\\.?\\d{0,4}$');

export const validateInterestRate = (value, setErrorMessage) => {
    if(!value) {
        setErrorMessage('Interest Rate is a Required Field');
        return false;
    }
    if(!interestRateRegex.test(value)) {
        setErrorMessage('Interest Rate needs to be a decimal between 0 and 99');
        return false;
    }
    setErrorMessage(undefined);
    return true;
};

export const InterestRateInput = (props) => {
    const {value, setValue, errorMessage} = props;
    const principalProps = {
        id:"loanInterestRate",
        placeholder:"Enter Loan Interest Rate",
        type:"string",
        value,
        title: "Loan Interest Rate",
        errorMessage: errorMessage,
        onChange: e => setValue(e.target.value)
    };
    return (<Input {...principalProps} />)
};