import web3 from './web3';
import abi from './interface.json';
import address from './address.json';

//console.log('abi  ',abi);
//console.log('address  ',address.address);


export default new web3.eth.Contract(abi, address);
