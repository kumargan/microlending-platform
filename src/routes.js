import React from 'react';
import { Route, Router, IndexRedirect } from 'react-router';
import Lenders from './Lenders';
import CreateLender from './CreateLender';
import Borrowers from './CreateBorrower';
import Transations from './Transactions';
import CreateRequest from './CreateRequest';
import LenderRequests from './LenderRequests';
import BorrowerRequests from './BorrowerRequests';
import App from './App';
import CreateBorrower from './CreateBorrower';

export default (
    <Router>
        <Route path="/" component={App}>
            <Route path='/lenders' component={Lenders} />
            <Route path='/create/request' component={CreateRequest} />
            <Route path='/create/borrower' component={CreateBorrower} />
            <Route path='/create/lender' component={CreateLender} />
            <Route path='/lender/requests' component={LenderRequests} />
            <Route path='/borrower/requests' component={BorrowerRequests} />
            <Route path='/transactions' component={Transations} />
        </Route>
    </Router>
);
