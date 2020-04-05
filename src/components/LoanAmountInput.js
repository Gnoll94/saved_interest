import React from 'react';
import {Input} from "./Input";

const loanRegex = RegExp('^[0-9]{1,15}$');

export const validateLoanAmount = (value, setErrorMessage) => {
    if(!value) {
        setErrorMessage('Loan Amount is a Required Field');
        return false;
    }
    if(!loanRegex.test(value)) {
        setErrorMessage('Loan Amount needs to be a number between 1 and 15 digits');
        return false;
    }
    setErrorMessage(undefined);
    return true;
};

export const LoanAmountInput = (props) => {
    const {value, setValue, errorMessage} = props;
    const principalProps = {
        id:"loanAmount",
        placeholder:"Enter Total Loan Amount",
        type:"string",
        value,
        title: "Total Loan Amount",
        errorMessage: errorMessage,
        onChange: e => setValue(e.target.value)
    };
    return (<Input {...principalProps} />)
};