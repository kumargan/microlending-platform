import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import proxy from './contract-proxy';

class App extends Component {
  state = {
    accounts: [],
    currentLender: '',
    currentLenderIndex: 0
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

  async componentDidMount() {
    let tempAccounts = await web3.eth.getAccounts();
    console.log("TEMP ACCOUNTS LENGTH :: ", tempAccounts.length);
    this.setState({ accounts: tempAccounts });
    console.log("ACCOUNTS LENGTH :: ", this.state.accounts.length);

    await proxy.methods.registerLender("Test 1", 9).call({ from: this.state.accounts[0] });
    let index = this.state.currentLenderIndex;
    let tempLender = await proxy.methods.showLender(index).call();
    this.setState({ currentLender: tempLender })
    console.log("LENDER 1 :: ", JSON.stringify(tempLender));
  }

  render() {
    return (
      <div className="App">
        <h2> microlending_platform </h2>
        {this.state.accounts[0]}
        <p> Lender Name  : {this.state.currentLender[0]}</p>
        <p> Lender ROI  : {this.state.currentLender[1]}</p>
        <p> Lender Address  : {this.state.currentLender[2]}</p>
        <button id="prevButton" onClick={() => this.getPreviousLender()} >Previous</button>
        <button id="nxtButton" onClick={() => this.getNextLender()} >Next</button>
      </div>
    );
  }
}

export default App;
