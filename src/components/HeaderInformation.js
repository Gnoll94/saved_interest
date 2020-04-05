import React from "react";

export const HeaderInformation = () => (
    <React.Fragment>
        <h1 className='col-12 text-center mt-3'>Saved Interest Calculator</h1>
        <p className='col-12 text-center'>
            This calculator takes in information pertaining to a specific loan, and calculates the amount of interest
            you would save by paying it off early.
        </p>
        <p className='col-12 text-center'>
            The Payoff date is the pay period you intend to fully pay off
            the rest of the loan
        </p>
    </React.Fragment>
);

