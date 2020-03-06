import React, {useState} from 'react';
import {startOfToday, format, addMonths, differenceInMonths} from 'date-fns'

export const App = () => {

    const [loanPrincipal, setLoanPrincipal] = useState(0);
    const [loanInterest, setLoanInterest] = useState(0);
    const [loanInterestRate, setLoanInterestRate] = useState(0);
    const [loanLength, setLoanLength] = useState();
    const [payOffDate, setPayOffDate] = useState(format(startOfToday(), 'yyyy-MM-dd'));
    const [loanTotalInterest, setLoanTotalInterest] = useState(0.00);
    const [loanEarlyMonths, setLoanEarlyMonths] = useState(0);
    const [monthlyPayment, setMonthlyPayment] = useState();

    const calculateTotal = () => {
        const loanTotal = (loanPrincipal + loanInterest);
        console.log("Loan Principal", loanPrincipal);
        console.log("Loan Interest", loanInterest);
        console.log("Loan Total", loanTotal);
        console.log("Loan Length", loanLength);

        const convertedRate = loanInterestRate * .01 / 12;
        console.log("Converted Rate", convertedRate);

        const convertedWithLoan = Math.pow(1 + convertedRate, loanLength);
        console.log("Converted With Loan", convertedWithLoan);

        setMonthlyPayment(Number(loanTotal / ((convertedWithLoan - 1) / (convertedRate * (convertedWithLoan)))));
        console.log(monthlyPayment.toFixed(2));

        const fullyPaidOffDate = addMonths(startOfToday(), loanLength);
        console.log(fullyPaidOffDate);

        setLoanEarlyMonths(differenceInMonths(fullyPaidOffDate, new Date(payOffDate)));
        setLoanTotalInterest(Number((loanInterestRate / loanLength) * (loanPrincipal)).toFixed(2));

        console.log(Number((loanInterestRate / differenceInMonths(fullyPaidOffDate, new Date(payOffDate))) * (loanPrincipal)).toFixed(2));
    };

    return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <div>Current Loan Principal</div>
          <input
            id="loanAmount"
            placeholder="Enter Loan Amount"
            type="number"
            value={loanPrincipal}
            onChange={e => setLoanPrincipal(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center">
          <div>Current Loan Interest</div>
          <input
            id="loanInterest"
            placeholder="Enter Loan Interest"
            type="number"
            value={loanInterest}
            onChange={e => setLoanInterest(Number(e.target.value))}
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
          <button onClick={calculateTotal}>Compute Saved Interest</button>
        </div>
      </div>
        <div className="row">
            <div className="col-12 text-center">
                <div>Loan Total Interest</div>
                {loanTotalInterest}
            </div>
        </div>
        <div className="row">
            <div className="col-12 text-center">
                <div>Loan Being Paid Off</div>
                {loanEarlyMonths}
                <div>Months Early</div>
            </div>
        </div>
    </div>
    );
};

export default App;
