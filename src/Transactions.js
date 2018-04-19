import React, { Component } from 'react';
import './Style.css';
import web3 from './web3';
import proxy from './contract-proxy';

class Transactions extends Component {
    state = {
        accounts: [],
        totalTransactions: 0,
        currentTransaction: {
            sender: '',
            receiver: '',
            amount: 0
        },
        currentTransactionIndex: 0
    }

    async getNextTransation() {
        let newIndex = this.state.currentTransaction + 1;
        if (newIndex < this.state.totalTransactions) {
            this.setState({ currentTransaction: newIndex });
            let tempTransation = await proxy.methods.showTransaction(newIndex).call({from : this.state.accounts[0]});
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
            let tempTransation = await proxy.methods.showTransaction(newIndex).call({from : this.state.accounts[0]});
            this.setState({ currentTransaction: tempTransation });
        }
        else {
            alert("Invalid Index for Transaction");
        }
    }

    async componentDidMount() {
        let tempAccounts = await web3.eth.getAccounts();
        this.setState({ accounts: tempAccounts });

        let tempTotalTransactions = await proxy.methods.numberOfTransactions().call({from : tempAccounts[0]});
        this.setState({ totalTransactions: parseInt(tempTotalTransactions) });

        let tempTransaction = await proxy.methods.showTransaction(this.state.currentTransactionIndex).call({from : tempAccounts[0]});
        this.setState({ currentTransaction: tempTransaction });
    }

    render() {
        return (
            <div className="Dashboard">
                <hr></hr>
                <p><u> Transaction Detail for Index: <b>{this.state.currentTransactionIndex} </b></u></p>
                <p> Sender  : <b>{this.state.currentTransaction[0]}</b></p>
                <p> Receiver  : <b>{this.state.currentTransaction[1]}</b></p>
                <p> Amount  : <b>{this.state.currentTransaction[2]}</b></p>
                <button id="prevButton" onClick={() => this.getPreviousTransation()} >Previous</button>
                <button id="nxtButton" onClick={() => this.getNextTransation()} >Next</button>
            </div>
        );
    }
}

export default Transactions;
