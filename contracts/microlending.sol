pragma solidity ^0.4.17;
//do not allow same lender to register itself as different lenders( use unique identifier )
contract microlending_platform {
    
    Lender[] lenders;
    Borrower[] borrowes;
    Request[] allRequests;
    mapping(address=>Request[]) lenderRequests;
    
    enum States { REQUESTED , APPROVED, REJECTED , CLOSED}
    struct Lender {
        address selfAdd;
        string name;
        uint roi;
    }
   // map(lenderAddress, Request[])
    struct Borrower {
        address selfAdd;
        string name;
        uint rating;
    }
    
    struct Request {
        address lender; //to be able display all transactions to everyone
        States state;
        address borrower; //for approval and display
        uint paymentDate;
        uint tenure;
        uint amount;
    }
    
    function showLender(uint index) public returns(string) {
        
    }
    
    function showLenders(uint startIndex, uint endIndex) public payable returns(string) {
        
    }
    
    function showTransaction(uint index) public returns(string){
        
    }
    
    function showTransactions(uint startIndex, uint endIndex) public payable returns(string){
        
    }
    
    function createRequest(address lender,uint amount, uint tenure) public payable{
        
    }
    
    function approveRequest(uint index) public onlyLender(index){
        
    }
    
    function rejectRequest(uint index) public onlyLender(index){
        
    }
    
    function closeRequest(uint index,uint score) public onlyLender(index){
        //function executor should be the one to approve or reject 
        //score should be out of 10
        //update score of the borrower
        
    }
    
    modifier onlyLender(uint index){
        require(msg.sender == lenders[index].selfAdd);
        _;
    }
}