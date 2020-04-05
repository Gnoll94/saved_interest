import React from 'react';
import {Input} from "./Input";

const loanLengthRegex = RegExp('^([1-9][0-9]{0,2}|1000)$');

export const validateLoanLength = (value, setErrorMessage) => {
    if(!value) {
        setErrorMessage('Loan Length is a Required Field');
        return false;
    }
    if(!loanLengthRegex.test(value)) {
        setErrorMessage('Interest Rate needs to be between 1 and 1000');
        return false;
    }
    setErrorMessage(undefined);
    return true;
};

export const LoanLengthInput = (props) => {
    const {value, setValue, errorMessage} = props;
    const principalProps = {
        id:"loanLength",
        placeholder:"Enter # of Loan Payments Remaining",
        type:"string",
        value,
        title: "Loan Length Left in Months",
        errorMessage: errorMessage,
        onChange: e => setValue(e.target.value)
    };
    return (<Input {...principalProps} />)
};