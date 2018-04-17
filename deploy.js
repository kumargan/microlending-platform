const HDWalletProvider =  require('truffle-hdwallet-provider');
const Web3 = require('web3');
const fs = require('fs');
const { interface, bytecode } = require('./compile');
var mnemonic = process.env.mnemonic.replace('Mnemonic:','').trim();
console.log(mnemonic);

const provider = new HDWalletProvider(
  mnemonic,
  'http://localhost:8545'
);

const  web3 = new Web3(provider);

const deploy = async ()=>{
  const accounts = await web3.eth.getAccounts();
  console.log("accounts ",accounts);
  console.log('attempting to deploy from account', accounts[0])
  const results = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:bytecode})
    .send({gas:'6721975',from:accounts[0]});

    console.log('contract deployed at ',results.options.address);
    //console.log('interface/ABI',interface);

    fs.writeFile("interface.json", interface, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("interface saved in interface.json");
    });
};

deploy();
