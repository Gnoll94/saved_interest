import React, {useState} from "react";
import {format, startOfToday} from "date-fns";
import {LoanAmountInput, validateLoanAmount} from "./LoanAmountInput";
import {InterestRateInput, validateInterestRate} from "./InterestRateInput";
import {LoanLengthInput, validateLoanLength} from "./LoanLengthInput";
import {PayoffDateInput, validatePayoffDate} from "./PayoffDateInput";
import {AmortizationTable, createAmortizationSchedule} from "./AmortizationTable";

export const LoanForm = () => {
    const [loanAmount, setLoanAmount] = useState();
    const [loanErrorMessage, setLoanErrorMessage] = useState(undefined);

    const [loanInterestRate, setLoanInterestRate] = useState();
    const [interestRateErrorMessage, setInterestRateErrorMessage] = useState(undefined);

    const [loanLength, setLoanLength] = useState();
    const [loanLengthErrorMessage, setLoanLengthErrorMessage] = useState(undefined);

    const [payoffDate, setPayoffDate] = useState(format(startOfToday(), 'yyyy-MM-dd'));
    const [payoffDateErrorMessage, setPayoffDateErrorMessage] = useState(undefined);

    const [finishOnPaymentNumber, setFinishOnPaymentNumber] = useState();
    const [amortizationSchedule, setAmortizationSchedule] = useState({});
    const [savedInterest, setSavedInterest] = useState(0.00);

    const validateForm = () => {
        return validateLoanAmount(loanAmount, setLoanErrorMessage) &
            validateInterestRate(loanInterestRate, setInterestRateErrorMessage) &
            validateLoanLength(loanLength, setLoanLengthErrorMessage) &
            validatePayoffDate(payoffDate, setPayoffDateErrorMessage)
    };

    const onClick = () => {
        if(validateForm()) {
            const [currentSavedInterest, loanTable, paymentIndex] = createAmortizationSchedule(Number(loanInterestRate), Number(loanAmount), loanLength, payoffDate);
            setAmortizationSchedule(loanTable);
            setSavedInterest(currentSavedInterest);
            setFinishOnPaymentNumber(String(paymentIndex));
        }
    };

    const tableProps = {
        amortizationSchedule,
        savedInterest,
        finishOnPaymentNumber
    };

    const loanAmountProps = {
        value: loanAmount,
        setValue: setLoanAmount,
        errorMessage: loanErrorMessage
    };

    const interestRateProps = {
        value: loanInterestRate,
        setValue: setLoanInterestRate,
        errorMessage: interestRateErrorMessage
    };

    const loanLengthProps = {
        value: loanLength,
        setValue: setLoanLength,
        errorMessage: loanLengthErrorMessage
    };

    const payoffDateProps = {
        value: payoffDate,
        setValue: setPayoffDate,
        errorMessage: payoffDateErrorMessage
    };

    return (
        <div className="container">
            <h1 className='col-12 text-center mt-3'>Saved Interest Calculator</h1>
            <p className='col-12 text-center'>
                This calculator takes in information pertaining to a specific loan, and calculates the amount of interest
                you would save by paying it off early.
            </p>
            <p className='col-12 text-center'>
                The Payoff date is the pay period you intend to fully pay off
                the rest of the loan
            </p>
            <form role='form'>
                <LoanAmountInput {...loanAmountProps} />
                <InterestRateInput {...interestRateProps} />
                <LoanLengthInput {...loanLengthProps} />
                <PayoffDateInput {...payoffDateProps} />
                <div className="row">
                    <div className="col-12 text-center p-3">
                        <button type="button" className="btn btn-primary" onClick={onClick}>Compute Saved Interest</button>
                    </div>
                </div>
            </form>
            <AmortizationTable {...tableProps} />
        </div>
    );
};