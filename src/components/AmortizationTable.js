import React from 'react';
import {addMonths, differenceInMonths, startOfToday} from "date-fns";

export const createAmortizationSchedule = (loanInterestRate, loanAmount, loanLength, payOffDate) => {

    // Interest & Payment Calculations
    const convertedRate = (loanInterestRate * .01) / 12;
    const firstInterestAmount = Math.round(((loanInterestRate * .01) / 12) * loanAmount * 100) / 100;
    const convertedWithLoan = Math.pow(1 + convertedRate, loanLength);
    const monthlyPayment = Math.round(Number(loanAmount / ((convertedWithLoan - 1) / (convertedRate * (convertedWithLoan)))) * 100) / 100;
    const fullyPaidOffDate = addMonths(startOfToday(), loanLength);

    const paymentIndex = loanLength - differenceInMonths(fullyPaidOffDate, new Date(payOffDate));

    const loanTable = [];

    loanTable[0] = {
        startingBalance: loanAmount,
        repayment: monthlyPayment,
        interestPaid: firstInterestAmount,
        principalPaid: (monthlyPayment - firstInterestAmount),
        newBalance: loanAmount - (monthlyPayment - firstInterestAmount)
    };

    let currentSavedInterest = 0.00;

    for (let i=1; i < loanLength; i++){
        const loanBalance = loanTable[i-1].newBalance;
        const interestPayment = ((loanInterestRate * .01) / 12) * loanBalance;
        const roundedInterest = Math.round(interestPayment * 100) / 100;
        if(i >= paymentIndex) {
            currentSavedInterest += roundedInterest
        }
        loanTable[i] = {
            startingBalance: loanTable[i-1].newBalance,
            repayment: monthlyPayment,
            interestPaid: roundedInterest,
            principalPaid: Math.round((monthlyPayment - roundedInterest) * 100) / 100,
            newBalance: i === loanLength - 1 ? 0.00 : Math.round((loanBalance - (monthlyPayment - roundedInterest)) * 100) / 100
            // If last payment, set newBalance to 0.00 to finish loan
        }
    }

    return [currentSavedInterest, loanTable, paymentIndex];
};

export const AmortizationTable = (props) => {
    const {amortizationSchedule, finishOnPaymentNumber, savedInterest} = props;
    const numberFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    const renderTableHeader = () => (
        <tr id='Header'>
            <th>Month</th>
            <th>Starting Balance</th>
            <th>Repayment</th>
            <th>Interest Paid</th>
            <th>Principal Paid</th>
            <th>New Balance</th>
        </tr>
    );

    const renderTableBody = () => {
        return Object.keys(amortizationSchedule).map((month, index) => {
            const { startingBalance, repayment, interestPaid, principalPaid, newBalance } = amortizationSchedule[month];
            return (
                <tr key={index} className={Number(month) >= Number(finishOnPaymentNumber) ? 'bg-success' : ''}>
                    <td>{index+1}</td>
                    <td>{numberFormat.format(startingBalance)}</td>
                    <td>{numberFormat.format(repayment)}</td>
                    <td>{numberFormat.format(interestPaid)}</td>
                    <td>{numberFormat.format(principalPaid)}</td>
                    <td>{numberFormat.format(newBalance)}</td>
                </tr>
            )
        });
    };

    const renderTable = () => {
        return (
            <table className='table table-striped table-bordered' id='months'>
                <tbody>
                {renderTableHeader()}
                {renderTableBody()}
                </tbody>
            </table>
        )
    };

    return (
        <div className="row">
        {Object.keys(amortizationSchedule).length > 0 && (
            <div className="col-12 text-center">
                <h4>Saved Interest Amount: {numberFormat.format(savedInterest)}</h4>
                <h1>Amortization Schedule</h1>
                {renderTable()}
            </div> )
        }
        </div>
    )
};