import web3 from './web3';
import abi from './interface.json';
import address from './address.json';
import addressR from './address-rinkeby.json';
//console.log('abi  ',abi);
//console.log('address  ',address.address);

var web3Obj = new web3.eth.Contract(abi, address.address);
console.log("process.env.REACT_APP_RINKEBY "+process.env.REACT_APP_RINKEBY);
if(process.env.REACT_APP_RINKEBY==="true"){
  web3Obj = new web3.eth.Contract(abi, addressR.address);
  console.log("using rinkeby address");
}

export default web3Obj;
