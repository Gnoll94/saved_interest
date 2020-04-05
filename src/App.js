import React, {useState} from 'react';
import {startOfToday, format} from 'date-fns'
import {AmortizationTable, createAmortizationSchedule} from "./components/AmortizationTable";
import {LoanAmountInput, validateLoanAmount} from "./components/LoanAmountInput";
import {InterestRateInput, validateInterestRate} from "./components/InterestRateInput";
import {LoanLengthInput, validateLoanLength} from "./components/LoanLengthInput";
import {PayoffDateInput, validatePayoffDate} from "./components/PayoffDateInput";

export const App = () => {

    const [loanAmount, setLoanAmount] = useState(30000);
    const [loanErrorMessage, setLoanErrorMessage] = useState(undefined);

    const [loanInterestRate, setLoanInterestRate] = useState(6.45);
    const [interestRateErrorMessage, setInterestRateErrorMessage] = useState(undefined);

    const [loanLength, setLoanLength] = useState(24);
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
        <form role='form'>
          <LoanAmountInput {...loanAmountProps} />
          <InterestRateInput {...interestRateProps} />
          <LoanLengthInput {...loanLengthProps} />
          <PayoffDateInput {...payoffDateProps} />
          <div className="row">
            <div className="col-12 text-center">
              <button type="button" className="btn btn-primary" onClick={onClick}>Compute Saved Interest</button>
            </div>
          </div>
        </form>
        <AmortizationTable {...tableProps} />
    </div>
    );
};

export default App;
