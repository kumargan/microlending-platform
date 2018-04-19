import React, { Component } from 'react';
import './Style.css';
import web3 from './web3';
import proxy from './contract-proxy';
import Input from './controls/Input';

class CreateLender extends Component {
    state = {
        accounts: [],
        lenderDetails: {
            name: '',
            roi: ''
        }
    }

    async registerLender(e, submitType) {
        await proxy.methods.registerLender(this.state.lenderDetails.name, parseInt(this.state.lenderDetails.roi))
            .send({ from: this.state.accounts[0], gas: 6654754 });
        alert("Lender added Successfully");
    }

    handleLenderInputChange(field, e) {
        let lenderDetails = this.state.lenderDetails;
        lenderDetails[field] = e.target.value;
        this.setState({ lenderDetails: lenderDetails });
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
                    <Input type="text" ref="lenderName" placeholder="Enter Lender Name"
                        value={this.state.lenderDetails.name} handleInputChange={this.handleLenderInputChange.bind(this, 'name')} />
                </div>
                <div>
                    <Input type="text" ref="lenderRoi" placeholder="Enter ROI"
                        value={this.state.lenderDetails.roi} handleInputChange={this.handleLenderInputChange.bind(this, 'roi')} />
                </div>
                <button id="registerLenderButton" onClick={() => this.registerLender()} >Register Lender</button>

            </div>
        );
    }
}

export default CreateLender;
