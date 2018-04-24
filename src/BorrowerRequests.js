import React from 'react';
import proxy from './contract-proxy';
import web3 from './web3';

export default class BorrowerRequests extends React.Component {
    state = {
        accounts: [],
        currentRequestIndex: 0,
        currentRequest: '',
        totalRquests: 0,
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

        let tempTotalRquests = await proxy.methods.totalBorrowerRequest().call({from : tempAccounts[0]});
        this.setState({ totalRquests: parseInt(tempTotalRquests) });

        let tempRequest = await proxy.methods.showBorrowerRequest(this.state.currentRequestIndex).call({from : tempAccounts[0]});
        this.setState({ currentRequest: tempRequest });
    }

    async getNextRequest() {
        let newIndex = this.state.currentRequestIndex + 1;
        if (newIndex < this.state.totalRquests) {
            this.setState({ currentRequestIndex: newIndex });
            let tempRequest = await proxy.methods.showBorrowerRequest(newIndex).call({from : this.state.accounts[0]});
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
            let tempRequest = await proxy.methods.showBorrowerRequest(newIndex).call({from : this.state.accounts[0]});
            this.setState({ currentRequest: tempRequest });
        }
        else {
            alert("Invalid Index for Request");
        }
    }

    async makePayment() {

    }

    render() {
        return (
            <div id="EntryPage">
                <hr></hr>
                <div>
                    <p><u> Request Index #: <b>{this.state.currentRequestIndex}</b></u> </p>
                    <p> Lender  : <b>{this.state.currentRequest[0]}</b></p>
                    <p> State  : <b>{this.state.status[this.state.currentRequest[1]]}</b></p>
                    <p> Tenure  : <b>{this.state.currentRequest[3]}</b></p>
                    <p> Amount  : <b>{this.state.currentRequest[4]}</b></p>
                    <button id="prevButton" onClick={() => this.getPreviousRequest()} >Previous</button>
                    <button id="nxtButton" onClick={() => this.getNextRequest()} >Next</button>
                </div>

                <div>
                    <button id="prevButton" onClick={() => this.makePayment()} >Make Payment</button>
                </div>
            </div>
        );
    }
}