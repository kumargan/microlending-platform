import React, { Component } from 'react';
import './Style.css';
import {Link} from 'react-router';
import web3 from './web3';
import proxy from './contract-proxy';
import Input from './controls/Input';

class Dashboard extends Component {
  state = {
    accounts: [],
    totalTransactions: 0,
    currentTransaction: {
      sender: '',
      receiver: '',
      amount: 0
    },
    currentTransactionIndex: 0,
    currentLender: '',
    currentLenderIndex: 0,
    totalLenders: 0,
    lenderDetails: {
      name: '',
      roi: ''
    },
    borrowerDetails: {
      name: ''
    },
    loanRequest: {
      lenderAddress: '',
      amount: '',
      tenure: ''
    }
  }

  async getNextLender() {
    let newIndex = this.state.currentLenderIndex + 1;
    if (newIndex < this.state.totalLenders) {
      this.setState({ currentLenderIndex: newIndex });
      let tempLender = await proxy.methods.showLender(newIndex).call();
      this.setState({ currentLender: tempLender });
    }
    else {
      alert("Invalid Index for Lender");
    }
  }

  async getPreviousLender() {
    let newIndex = this.state.currentLenderIndex - 1;
    if (newIndex > -1) {
      this.setState({ currentLenderIndex: newIndex });
      let tempLender = await proxy.methods.showLender(newIndex).call();
      this.setState({ currentLender: tempLender });
    }
    else {
      alert("Invalid Index for Lender");
    }
  }

  async getNextTransation() {
    let newIndex = this.state.currentTransaction + 1;
    if (newIndex < this.state.totalTransactions) {
      this.setState({ currentTransaction: newIndex });
      let tempTransation = await proxy.methods.showTransaction(newIndex).call();
      this.setState({ currentTransaction: tempTransation });
    }
    else {
      alert("Invalid Index for Transaction");
    }
  }

  async getPreviousTransation() {
    let newIndex = this.state.currentTransaction - 1;
    if (newIndex > -1) {
      this.setState({ currentTransaction: newIndex });
      let tempTransation = await proxy.methods.showTransaction(newIndex).call();
      this.setState({ currentTransaction: tempTransation });
    }
    else {
      alert("Invalid Index for Transaction");
    }
  }

  async registerLender(e, submitType) {
    await proxy.methods.registerLender(this.state.lenderDetails.name, parseInt(this.state.lenderDetails.roi))
      .send({ from: this.state.accounts[0], gas: 6654754 });
    alert("Lender added Successfully");
  }

  async registerBorrower(e, submitType) {
    await proxy.methods.createBorrower(this.state.borrowerDetails.name)
      .send({ from: this.state.accounts[0], gas: 6654754 });
    alert("Borrower added Successfully");
  }

  async createLoanRequest(e) {
    await proxy.methods.createRequest(this.state.loanRequest.lenderAddress,
      parseInt(this.state.loanRequest.amount),
      parseInt(this.state.loanRequest.tenure))
      .send({ from: this.state.accounts[0], gas: 6654754 });
    alert("Request added Successfully");
  }

  handleLenderInputChange(field, e) {
    let lenderDetails = this.state.lenderDetails;
    lenderDetails[field] = e.target.value;
    this.setState({ lenderDetails: lenderDetails });
  }

  handleBorrowerInputChange(field, e) {
    let borrowerDetails = this.state.borrowerDetails;
    borrowerDetails[field] = e.target.value;
    this.setState({ borrowerDetails: borrowerDetails });
  }

  handleLoanRequestInputChange(field, e) {
    let loanRequest = this.state.loanRequest;
    loanRequest[field] = e.target.value;
    this.setState({ loanRequest: loanRequest });
  }

  async componentDidMount() {
    let tempAccounts = await web3.eth.getAccounts();
    this.setState({ accounts: tempAccounts });

    let tempTotalLenders = await proxy.methods.numberOfLenders().call();
    this.setState({ totalLenders: parseInt(tempTotalLenders) });

    let tempLender = await proxy.methods.showLender(this.state.currentLenderIndex).call();
    this.setState({ currentLender: tempLender });

    let tempTotalTransactions = await proxy.methods.numberOfTransactions().call();
    this.setState({ totalTransactions: parseInt(tempTotalTransactions) });

    let tempTransaction = await proxy.methods.showTransaction(this.state.currentTransactionIndex).call();
    this.setState({ currentTransaction: tempTransaction });
  }

  render() {
    return (
      <div className="Dashboard">
        <h2> Microlending Platform </h2>
        <p><u> Lender Detail for Index: <b>{this.state.currentLenderIndex}</b></u> </p>
        <p> Name  : <b>{this.state.currentLender[0]}</b></p>
        <p> ROI  : <b>{this.state.currentLender[1]}</b></p>
        <p> Address  : <b>{this.state.currentLender[2]}</b></p>
        <button id="prevButton" onClick={() => this.getPreviousLender()} >Previous</button>
        <button id="nxtButton" onClick={() => this.getNextLender()} >Next</button>
        <Link to="/lender/requests" name="lenderReqButton" id="lenderReqButton">View Lender Requests</Link>
        <hr></hr>
        <div>
          <Input type="text" ref="lenderName" placeholder="Enter Lender Name"
            value={this.state.lenderDetails.name} handleInputChange={this.handleLenderInputChange.bind(this, 'name')} />
        </div>
        <div>
          <Input type="text" ref="lenderRoi" placeholder="Enter ROI"
            value={this.state.lenderDetails.roi} handleInputChange={this.handleLenderInputChange.bind(this, 'roi')} />
        </div>
        <button id="registerLenderButton" onClick={() => this.registerLender()} >Register Lender</button>
        <hr></hr>
        <div>
          <Input type="text" ref="borrowerName" placeholder="Enter Borrower Name"
            value={this.state.borrowerDetails.name} handleInputChange={this.handleBorrowerInputChange.bind(this, 'name')} />
        </div>
        <button id="registerBorrowerButton" onClick={() => this.registerBorrower()} >Register Borrower</button>
        <Link to="/borrower/requests" name="borrowerReqButton" id="borrowerReqButton">View Borrower Requests</Link>

        <hr></hr>
        <div>
          <Input type="text" ref="lenderAddress" placeholder="Enter Lender Address"
            value={this.state.loanRequest.lenderAddress} handleInputChange={this.handleLoanRequestInputChange.bind(this, 'lenderAddress')} />
          <Input type="text" ref="amount" placeholder="Enter Loan Amount"
            value={this.state.loanRequest.amount} handleInputChange={this.handleLoanRequestInputChange.bind(this, 'amount')} />
          <Input type="text" ref="tenure" placeholder="Enter Tenure for Loan (in days)"
            value={this.state.loanRequest.tenure} handleInputChange={this.handleLoanRequestInputChange.bind(this, 'tenure')} />
        </div>
        <button id="createLoanReqButton" onClick={() => this.createLoanRequest()} >Create Loan Request</button>

        <hr></hr>
        <div>
          <p><u> Transaction Detail for Index: <b>{this.state.currentTransactionIndex} </b></u></p>
          <p> Sender  : <b>{this.state.currentTransaction[0]}</b></p>
          <p> Receiver  : <b>{this.state.currentTransaction[1]}</b></p>
          <p> Amount  : <b>{this.state.currentTransaction[2]}</b></p>
          <button id="prevButton" onClick={() => this.getPreviousTransation()} >Previous</button>
          <button id="nxtButton" onClick={() => this.getNextTransation()} >Next</button>
        </div>
      </div>
    );
  }
}

export default Dashboard;
