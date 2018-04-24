import React from 'react';
import proxy from './contract-proxy';
import web3 from './web3';
import Input from './controls/Input';

export default class LenderRequests extends React.Component {
    state = {
        accounts: [],
        currentRequestIndex: 0,
        currentRequest: '',
        totalRquests: 0,
        borrowerRating: '',
        enterBorrowerRating: '',
        status: {
            0: 'REQUESTED',
            1: 'APPROVED',
            2: 'REJECTED',
            3: 'BORROWER_PAID',
            4: 'CLOSED'
        }
    }

    async componentDidMount() {
        let tempAccounts = await web3.eth.getAccounts();
        this.setState({ accounts: tempAccounts });

        let tempTotalRquests = await proxy.methods.totalLenderRequests().call({ from: tempAccounts[0] });
        this.setState({ totalRquests: parseInt(tempTotalRquests) });

        let tempRequest = await proxy.methods.showLenderRequests(this.state.currentRequestIndex).call({ from: tempAccounts[0] });
        this.setState({ currentRequest: tempRequest });
    }

    async getNextRequest() {
        let newIndex = this.state.currentRequestIndex + 1;
        if (newIndex < this.state.totalRquests) {
            this.setState({ currentRequestIndex: newIndex });
            let tempRequest = await proxy.methods.showLenderRequests(newIndex).call({ from: this.state.accounts[0] });
            this.setState({ currentRequest: tempRequest });
        }
        else {
            alert("Invalid Index for Request");
        }
    }


    async getPreviousRequest() {
        let newIndex = this.state.currentRequestIndex - 1;
        if (newIndex > -1) {
            this.setState({ currentRequestIndex: newIndex });
            let tempRequest = await proxy.methods.showLenderRequests(newIndex).call({ from: this.state.accounts[0] });
            this.setState({ currentRequest: tempRequest });
        }
        else {
            alert("Invalid Index for Request");
        }
    }

    async closeRequest() {
        if (this.state.enterBorrowerRating) {
            await proxy.methods.closeRequest(this.state.currentRequestIndex, this.state.enterBorrowerRating)
                .send({ from: this.state.accounts[0], gas: 6654754 });
            alert("Request closed successfully");
        }
        else {
            alert("Enter Borrower Rating.");
        }
    }

    async rejectRequest() {
        await proxy.methods.approveRequest(this.state.currentRequestIndex, false)
            .send({ from: this.state.accounts[0], gas: 6654754 });
        alert("Request is rejected.");
    }

    async approveRequest() {
        await proxy.methods.approveRequest(this.state.currentRequestIndex, true)
            .send({ from: this.state.accounts[0], gas: 6654754 });
        alert("Request is approved.");
    }

    async getBorrowerRating() {
        let tempRating = await proxy.methods.showBorrowerRating(this.state.currentRequest[0])
            .call({ from: this.state.accounts[0] });

        this.setState({ borrowerRating: tempRating });
    }

    handleBorrowerRatingChange(field, e) {
        let tempBorrowerRating = e.target.value;
        this.setState({ enterBorrowerRating: tempBorrowerRating });
    }

    render() {
        return (
            <div id="EntryPage">
                <hr></hr>
                <div>
                    <p><u> Request Index #: <b>{this.state.currentRequestIndex}</b></u> </p>
                    <p> Borrower  : <b>{this.state.currentRequest[0]}</b></p>
                    <p> State  : <b>{this.state.status[this.state.currentRequest[1]]}</b></p>
                    <p> Tenure  : <b>{this.state.currentRequest[3]}</b></p>
                    <p> Amount  : <b>{this.state.currentRequest[4]}</b></p>
                    <button id="prevButton" onClick={() => this.getPreviousRequest()} >Previous</button>
                    <button id="nxtButton" onClick={() => this.getNextRequest()} >Next</button>
                </div>

                <div>
                    <button id="prevButton" onClick={() => this.rejectRequest()} >Reject</button>
                    <button id="nxtButton" onClick={() => this.approveRequest()} >Approve</button>
                    <button id="nxtButton" onClick={() => this.closeRequest()} >Close</button>
                    <button id="nxtButton" onClick={() => this.getBorrowerRating()} >Show Borrower Rating</button>

                </div>
                <div>
                    <text>Existing Rating of the Borrower :  {this.state.borrowerRating}</text>
                    <Input type="text" ref="enterBorrowerRating" placeholder="Enter Rating for Borrower"
                        value={this.state.enterBorrowerRating} handleInputChange={this.handleBorrowerRatingChange.bind(this, 'name')} />
                </div>
            </div>
        );
    }
}