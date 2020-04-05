import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import {LoanForm} from "./components/LoanForm";

export const App = () => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Route path={'/'} component={LoanForm} />
        </BrowserRouter>
    )
};
export default App;
