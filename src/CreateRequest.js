import React, { Component } from 'react';
import './Style.css';
import web3 from './web3';
import proxy from './contract-proxy';
import Input from './controls/Input';

class CreateRequest extends Component {
    state = {
        accounts: [],
        loanRequest: {
            lenderAddress: '',
            amount: '',
            tenure: ''
        }
    }

    async createLoanRequest(e) {
        await proxy.methods.createRequest(this.state.loanRequest.lenderAddress,
            parseInt(this.state.loanRequest.amount),
            parseInt(this.state.loanRequest.tenure))
            .send({ from: this.state.accounts[0], gas: 6654754 });
        alert("Request added Successfully");
    }

    handleLoanRequestInputChange(field, e) {
        let loanRequest = this.state.loanRequest;
        loanRequest[field] = e.target.value;
        this.setState({ loanRequest: loanRequest });
    }

    async componentDidMount() {
        let tempAccounts = await web3.eth.getAccounts();
        this.setState({ accounts: tempAccounts });
    }

    render() {
        return (
            <div className="Dashboard">
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
            </div>
        );
    }
}

export default CreateRequest;
