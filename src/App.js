import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router';

class App extends Component {
  state = {

  }
  render() {
    return (
      <div className="App">
        <h2> Microlending Platform </h2>
        <div>
          <Link to="/lenders" name="lendersButton" id="lendersButton">Lenders</Link>
        </div>
        <div>
          <Link to="/create/lender" name="lendersButton" id="lendersButton">Create Lender</Link>
        </div>
        <div>
          <Link to="/create/borrower" name="lenderReqButton" id="lenderReqButton">Create Borrower</Link>
        </div>
        <div>
          <Link to="/create/request" name="lenderReqButton" id="lenderReqButton">Create Request</Link>
        </div>
        <div>
          <Link to="/transactions" name="lenderReqButton" id="lenderReqButton">View All Transactions</Link>
        </div>
        <div>
          <Link to="/lender/requests" name="lenderReqButton" id="lenderReqButton">View Lender Requests</Link>
        </div>
        <div>
          <Link to="/borrower/requests" name="lenderReqButton" id="lenderReqButton">View Borrower Requests</Link>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
