import React, { Component } from 'react';
import './Style.css';
import { Link } from 'react-router';
import web3 from './web3';
import proxy from './contract-proxy';
import Input from './controls/Input';

class CreateBorrower extends Component {
    state = {
        accounts: [],
        borrowerDetails: {
            name: ''
        }
    }

    async registerBorrower(e, submitType) {
        await proxy.methods.createBorrower(this.state.borrowerDetails.name)
            .send({ from: this.state.accounts[0], gas: 6654754 });
        alert("Borrower added Successfully");
    }

    handleBorrowerInputChange(field, e) {
        let borrowerDetails = this.state.borrowerDetails;
        borrowerDetails[field] = e.target.value;
        this.setState({ borrowerDetails: borrowerDetails });
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
                    <Input type="text" ref="borrowerName" placeholder="Enter Borrower Name"
                        value={this.state.borrowerDetails.name} handleInputChange={this.handleBorrowerInputChange.bind(this, 'name')} />
                </div>
                <button id="registerBorrowerButton" onClick={() => this.registerBorrower()} >Register Borrower</button>
                <Link to="/borrower/requests" name="borrowerReqButton" id="borrowerReqButton">View Borrower Requests</Link>

            </div>
        );
    }
}

export default CreateBorrower;
