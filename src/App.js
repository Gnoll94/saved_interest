import React, {useState} from 'react';
import {startOfToday, format, addMonths, differenceInMonths} from 'date-fns'

const roundNumber = (number, places) => parseFloat(number.toFixed(places))

export const App = () => {

    const [loanAmount, setLoanAmount] = useState(30000);
    const [loanInterestRate, setLoanInterestRate] = useState(8.40);
    const [loanLength, setLoanLength] = useState(72);
    const [payOffDate, setPayOffDate] = useState(format(startOfToday(), 'yyyy-MM-dd'));
    const [loanTotalInterest, setLoanTotalInterest] = useState(0.00);
    const [loanEarlyMonths, setLoanEarlyMonths] = useState(0);
    const [monthlyPayment, setMonthlyPayment] = useState();

    const calculateTotal = () => {

        const convertedRate = (loanInterestRate * .01) / 12;
        console.log("Converted Rate", convertedRate);

        const firstInterestAmount = ((loanInterestRate * .01) / 12) * loanAmount;
        console.log("First Interest Amount", firstInterestAmount);

        console.log("Loan Amount", loanAmount);
        console.log("Loan Length", loanLength);

        const convertedWithLoan = Math.pow(1 + convertedRate, loanLength);
        console.log("Converted With Loan", convertedWithLoan);

        const monthlyPayment = Math.round(Number(loanAmount / ((convertedWithLoan - 1) / (convertedRate * (convertedWithLoan)))));
        console.log("Monthly Payment", monthlyPayment);
        const loanTable = {};

        loanTable[0] = {
            startingBalance: loanAmount,
            repayment: monthlyPayment,
            interestPaid: firstInterestAmount,
            principalPaid: (monthlyPayment - firstInterestAmount),
            newBalance: loanAmount - (monthlyPayment - firstInterestAmount)
        };

        for (let i=1; i < loanLength; i++){
            const loanBalance = loanTable[i-1].newBalance;
            const interestPayment = ((loanInterestRate * .01) / 12) * loanBalance;
            const roundedInterest = Math.round(interestPayment * 100) / 100;
            loanTable[i] = {
                startingBalance: loanTable[i-1].newBalance,
                repayment: monthlyPayment,
                interestPaid: roundedInterest,
                principalPaid: Math.round((monthlyPayment - roundedInterest) * 100) / 100,
                newBalance: Math.round((loanBalance - (monthlyPayment - roundedInterest)) * 100) / 100
            }
        }
        console.log(loanTable);

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
