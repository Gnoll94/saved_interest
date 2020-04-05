import React from 'react';
import {Input} from "./Input";

export const validatePayoffDate = (value, setErrorMessage) => {
    if(!value) {
        setErrorMessage('Loan Length is a Required Field');
        return false;
    }
    setErrorMessage(undefined);
    return true;
};

export const PayoffDateInput = (props) => {
    const {value, setValue, errorMessage} = props;
    const principalProps = {
        id:"payoffDate",
        placeholder:"Enter Loan Payoff Date",
        type:"date",
        value,
        title: "Enter Payoff Date",
        errorMessage,
        onChange: e => setValue(e.target.value)
    };
    return (<Input {...principalProps} />)
};