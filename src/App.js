import React, {useState} from 'react';
import {startOfToday, format} from 'date-fns'
import {AmortizationTable, createAmortizationSchedule} from "./components/AmortizationTable";
import {Input} from "./components/Input";

export const App = () => {

    const [loanAmount, setLoanAmount] = useState(30000);
    const [loanErrorMessage, setLoanErrorMessage] = useState(undefined);
    const loanRegex = RegExp('[0-9]{1,15}');

    const [loanInterestRate, setLoanInterestRate] = useState(6.45);
    const [interestRateErrorMessage, setInterestRateErrorMessage] = useState(undefined);

    const [loanLength, setLoanLength] = useState(24);
    const [loanLengthErrorMessage, setLoanLengthErrorMessage] = useState(undefined);

    const [payoffDate, setPayoffDate] = useState(format(startOfToday(), 'yyyy-MM-dd'));
    const [payoffDateErrorMessage, setPayoffDateErrorMessage] = useState(undefined);

    const [finishOnPaymentNumber, setFinishOnPaymentNumber] = useState();
    const [amortizationSchedule, setAmortizationSchedule] = useState({});
    const [savedInterest, setSavedInterest] = useState(0.00);

    const validateLoanAmount = () => {
        if(!loanAmount) {
            setLoanErrorMessage('Loan Amount is a Required Field');
            return false;
        }
        if(!loanRegex.test(loanAmount)) {
            setLoanErrorMessage('Loan Amount needs to be a number between 1 and 15 digits');
            return false;
        }
        setLoanErrorMessage(undefined);
        return true;
    };

    const validateForm = () => {
        return validateLoanAmount() & true
    };

    const onClick = () => {
        if(validateForm()) {
            const [currentSavedInterest, loanTable, paymentIndex] = createAmortizationSchedule(loanInterestRate, loanAmount, loanLength, payoffDate);
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

    const principalProps = {
        id:"loanAmount",
        placeholder:"Enter Total Loan Amount",
        type:"string",
        value:loanAmount,
        title: "Total Loan Amount",
        errorMessage: loanErrorMessage,
        onChange: e => setLoanAmount(e.target.value)
    };

    const interestRateProps = {
        id:"loanInterestRate",
        placeholder:"Enter Loan Interest Rate",
        type:"string",
        value:loanInterestRate,
        title: "Loan Interest Rate",
        errorMessage: interestRateErrorMessage,
        onChange: e => setLoanInterestRate(e.target.value)
    };

    const loanLengthProps = {
        id:"loanLength",
        placeholder:"Enter # of Loan Payments Remaining",
        type:"string",
        value:loanLength,
        title: "Loan Length Left in Months",
        errorMessage: loanLengthErrorMessage,
        onChange: e => setLoanLength(e.target.value)
    };

    const payoffDateProps = {
        id:"payoffDate",
        placeholder:"Enter Loan Payoff Date",
        type:"date",
        value:payoffDate,
        title: "Enter Payoff Date",
        errorMessage: payoffDateErrorMessage,
        onChange: e => setPayoffDate(e.target.value)
    };

    return (
    <div className="container">
        <form role='form'>
          <Input {...principalProps} />
          <Input {...interestRateProps} />
          <Input {...loanLengthProps} />
          <Input {...payoffDateProps} />
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
