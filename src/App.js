import React, {useState, useEffect} from 'react';
import {startOfToday, format, addMonths, differenceInMonths} from 'date-fns'
import {AmortizationTable, createAmortizationSchedule} from "./components/AmortizationTable";
import {Input} from "./components/Input";

export const App = () => {

    const [loanAmount, setLoanAmount] = useState(30000);
    const [loanInterestRate, setLoanInterestRate] = useState(8.40);
    const [loanLength, setLoanLength] = useState(72);
    const [payOffDate, setPayOffDate] = useState(format(startOfToday(), 'yyyy-MM-dd'));
    const [finishOnPaymentNumber, setFinishOnPaymentNumber] = useState();
    const [amortizationSchedule, setAmortizationSchedule] = useState({});
    const [savedInterest, setSavedInterest] = useState(0.00);

    const onClick = () => {
        const [currentSavedInterest, loanTable, paymentIndex] = createAmortizationSchedule(loanInterestRate, loanAmount, loanLength, payOffDate);
        setAmortizationSchedule(loanTable);
        setSavedInterest(currentSavedInterest);
        setFinishOnPaymentNumber(String(paymentIndex));
    };

    const tableProps = {
        amortizationSchedule,
        savedInterest,
        finishOnPaymentNumber
    };

    return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <div>Current Loan Principal</div>
          <input
            id="loanAmount"
            placeholder="Enter Total Loan Amount"
            type="number"
            value={loanAmount}
            onChange={e => setLoanAmount(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center">
          <div>Loan Interest Rate</div>
          <input
            id="loanInterestRate"
            placeholder="Enter Loan Interest Rate"
            type="number"
            value={loanInterestRate}
            onChange={e => setLoanInterestRate(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center">
          <div>Loan Length Left in Months</div>
          <input
            id="loanLength"
            placeholder="Enter # of Loan Payments Remaining"
            type="number"
            value={loanLength}
            onChange={e => setLoanLength(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center">
          <div>Enter Payoff Date</div>
          <input
            id="loanLength"
            placeholder="Enter Loan Payoff Date"
            type="date"
            value={payOffDate}
            onChange={e => setPayOffDate(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center">
          <button onClick={onClick}>Compute Saved Interest</button>
        </div>
      </div>
        <AmortizationTable {...tableProps} />
    </div>
    );
};

export default App;
