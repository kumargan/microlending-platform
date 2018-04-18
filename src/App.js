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
    lenderDetails: {
      name: '',
      roi: ''
    },
    borrowerDetails: {
      name: ''
    }
  }

  async getNextLender() {
    this.setState({ currentLenderIndex: this.state.currentLenderIndex + 1 });
    let tempIndex = this.state.currentLenderIndex;
    let tempLender = await proxy.methods.showLender(tempIndex).call();
    this.setState({ currentLender: tempLender })
    console.log("LENDER 2 :: ", JSON.stringify(tempLender));
  }

  async getPreviousLender() {
    this.setState({ currentLenderIndex: this.state.currentLenderIndex - 1 });
    let index = this.state.currentLenderIndex;
    let tempLender = await proxy.methods.showLender(index).call();
    this.setState({ currentLender: tempLender })
    console.log("LENDER 2 :: ", JSON.stringify(tempLender));
  }

  async getLenderRequests() {

  }

  async registerLender(e, submitType) {
    await proxy.methods.registerLender(this.state.lenderDetails.name, parseInt(this.state.lenderDetails.roi))
    .send({ from: this.state.accounts[0], gas: 6654754 });
  }

  handleLenderInputChange(field, e) {
    console.log("yoo");
    let lenderDetails = this.state.lenderDetails;
    lenderDetails[field] = e.target.value;
    this.setState({ lenderDetails: lenderDetails });
  }


  handleBorrowerInputChange(field, e) {
    let borrowerDetails = this.state.borrowerDetails;
    borrowerDetails[field] = e.target.value;
    this.setState({ borrowerDetails: borrowerDetails });
  }


  async componentDidMount() {
    let tempAccounts = await web3.eth.getAccounts();
    this.setState({ accounts: tempAccounts });
    let index = this.state.currentLenderIndex || 0;
    let tempLender = await proxy.methods.showLender(index).call();
    this.setState({ currentLender: tempLender })
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
          <input type="text" ref="borrowerName" placeholder="Enter Borrower Name"
            value={this.state.borrowerDetails.name} maxLength={100}
            handleInputChange={this.handleBorrowerInputChange.bind(this, 'name')}
            required />
        </div>


        <button id="registerBorrowerButton" onClick={() => this.registerBorrower()} >Register Borrower</button>
      </div>
    );
  }
}

export default App;
