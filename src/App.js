import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import proxy from './contract-proxy';
import Input from './controls/Input';

class App extends Component {
  state = {
    accounts: [],
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
      console.log("LENDER : ", JSON.stringify(tempLender));
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
      this.setState({ currentLender: tempLender })
      console.log("LENDER 2 :: ", JSON.stringify(tempLender));
    }
    else {
      alert("Invalid Index for Lender");
    }
  }

  async getLenderRequests() {

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

  async createRequest(e) {
    await proxy.methods.createBorrower(this.state.loanRequest.lenderAddress,
      parseInt(this.state.loanRequest.amount),
      parseInt(this.state.loanRequest.tenure))
      .send({ from: this.state.accounts[0], gas: 6654754 });
  }

  async componentDidMount() {
    let tempTotalLenders = await proxy.methods.numberOfLenders().call();
    this.setState({ totalLenders: parseInt(tempTotalLenders) });
    let tempAccounts = await web3.eth.getAccounts();
    this.setState({ accounts: tempAccounts });
    let tempLender = await proxy.methods.showLender(this.state.currentLenderIndex).call();
    this.setState({ currentLender: tempLender });
  }

  render() {
    return (
      <div className="App">
        <h2> Microlending Platform </h2>
        <p> Lender detail for Index: {this.state.currentLenderIndex} </p>
        <p> Name  : {this.state.currentLender[0]}</p>
        <p> ROI  : {this.state.currentLender[1]}</p>
        <p> Address  : {this.state.currentLender[2]}</p>
        <button id="prevButton" onClick={() => this.getPreviousLender()} >Previous</button>
        <button id="nxtButton" onClick={() => this.getNextLender()} >Next</button>
        <button id="lenderReqButton" onClick={() => this.getLenderRequests()} >View Lender Requests</button>

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

        <hr></hr>
        <div>
          <Input type="text" ref="lenderAddress" placeholder="Enter Lender Address"
            value={this.state.loanRequest.lenderAddress} handleInputChange={this.handleLoanRequestInputChange.bind(this, 'lenderAddress')} />
          <Input type="text" ref="amount" placeholder="Enter Loan Amount"
            value={this.state.borrowerDetails.name} handleInputChange={this.handleLoanRequestInputChange.bind(this, 'amount')} />
          <Input type="text" ref="tenure" placeholder="Enter Tenure for Loan"
            value={this.state.borrowerDetails.name} handleInputChange={this.handleLoanRequestInputChange.bind(this, 'tenure')} />
        </div>
        <button id="createLoanReqButton" onClick={() => this.createLoanRequest()} >Create Loan Request</button>
      </div>
    );
  }
}

export default App;
