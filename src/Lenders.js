import React, { Component } from 'react';
import './Style.css';
import { Link } from 'react-router';
import web3 from './web3';
import proxy from './contract-proxy';
import Input from './controls/Input';

class Lenders extends Component {
    state = {
        accounts: [],
        currentLender: '',
        currentLenderIndex: 0,
        totalLenders: 0
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

    async componentDidMount() {
        let tempAccounts = await web3.eth.getAccounts();
        this.setState({ accounts: tempAccounts });

        let tempTotalLenders = await proxy.methods.numberOfLenders().call();
        this.setState({ totalLenders: parseInt(tempTotalLenders) });

        let tempLender = await proxy.methods.showLender(this.state.currentLenderIndex).call();
        this.setState({ currentLender: tempLender });
    }

    render() {
        return (
            <div className="Dashboard">
                <hr></hr>
                <p><u> Lender Detail for Index: <b>{this.state.currentLenderIndex}</b></u> </p>
                <p> Name  : <b>{this.state.currentLender[0]}</b></p>
                <p> ROI  : <b>{this.state.currentLender[1]}</b></p>
                <p> Address  : <b>{this.state.currentLender[2]}</b></p>
                <button id="prevButton" onClick={() => this.getPreviousLender()} >Previous</button>
                <button id="nxtButton" onClick={() => this.getNextLender()} >Next</button>
                <Link to="/lender/requests" name="lenderReqButton" id="lenderReqButton">View Lender Requests</Link>

            </div>
        );
    }
}

export default Lenders;
