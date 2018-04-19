import React, { Component } from 'react';
import proxy from './contract-proxy';

export default class LenderRequests extends React.Component {
    state = {
        currentRequestIndex: 0,
        currentRequest: '',
        totalRquests: 0,
        borrowerRating: ''
    }
    constructor(props) {
        super(props);

    };

    async componentDidMount() {
        let tempTotalRquests = await proxy.methods.totalLenderRequests().call();
        this.setState({ totalRquests: parseInt(tempTotalRquests) });

        let tempRequest = await proxy.methods.showLenderRequests(this.state.currentRequestIndex).call();
        this.setState({ currentRequest: tempRequest });
    }

    async getNextRequest() {
        let newIndex = this.state.currentRequestIndex + 1;
        if (newIndex < this.state.totalRquests) {
            this.setState({ currentRequestIndex: newIndex });
            let tempRequest = await proxy.methods.showLenderRequests(newIndex).call();
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
            let tempRequest = await proxy.methods.showLenderRequests(newIndex).call();
            this.setState({ currentRequest: tempRequest });
        }
        else {
            alert("Invalid Index for Request");
        }
    }

    async closeRequest() {

    }

    async rejectRequest() {

    }

    async approveRequest() {

    }

    async getBorrowerRating() {

    }

    render() {
        return (
            <div id="EntryPage">
                <hr></hr>
                <div>
                    <p><u> Request Index #: <b>{this.state.currentRequestIndex}</b></u> </p>
                    <p> Borrower  : <b>{this.state.currentRequest[0]}</b></p>
                    <p> State  : <b>{this.state.currentRequest[1]}</b></p>
                    <p> Tenure  : <b>{this.state.currentRequest[3]}</b></p>
                    <p> Amount  : <b>{this.state.currentRequest[4]}</b></p>
                    <button id="prevButton" onClick={() => this.getPreviousRequest()} >Previous</button>
                    <button id="nxtButton" onClick={() => this.getNextRequest()} >Next</button>
                </div>

                <div>
                    <button id="prevButton" onClick={() => this.rejectRequest()} >Reject</button>
                    <button id="nxtButton" onClick={() => this.approveRequest()} >Approve</button>
                    <button id="nxtButton" onClick={() => this.closeRequest()} >Close</button>
                    <button id="nxtButton" onClick={() => this.getBorrowerRating()} >Show Applicants Rating</button>
                    <text>{this.state.borrowerRating}</text>
                </div>
            </div>
        );
    }
}