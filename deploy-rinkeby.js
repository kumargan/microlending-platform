const HDWalletProvider =  require('truffle-hdwallet-provider');
const Web3 = require('web3');
const fs = require('fs');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'clinic aim column stone heavy cotton ball pave border guess thumb hidden',
  'https://rinkeby.infura.io/CUoXynyUGMppTJf8yjcT '
);

const  web3 = new Web3(provider);

const deploy = async ()=>{
  const accounts = await web3.eth.getAccounts();
  console.log('attempting to deploy from account', accounts[0])
  const results = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:bytecode})
    .send({gas:'6721975',from:accounts[0]});

    console.log('contract deployed at ',results.options.address);

    fs.writeFile("./src/interface.json", interface, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("interface saved in interface.json");
    });

    let addressJson = {};
    addressJson.address  = results.options.address;
    fs.writeFile("./src/address-rinkeby.json", JSON.stringify(addressJson), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("interface saved in address-rinkby.json");
    });
};

deploy();
