pragma solidity ^0.4.21;
pragma experimental ABIEncoderV2;
//do not allow same lender to register itself as different lenders( use unique identifier )
contract microlending_platform {
    
    Lender[] public lenders;
    //Borrower[] public borrowers;
    Transaction[] public allTransactions;
    mapping(address=>bool) isLender;
    mapping(address=>Request[]) lenderRequests;
    mapping(address=>Borrower) borrowers;
    
    enum States { REQUESTED , APPROVED, REJECTED , CLOSED }
    
    struct Transaction{
        address sender;
        address receiver;
        uint amount;
    }
    
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
        uint paymentDate; //date by which loan is to be paid( calculated based on tenure and now )
        uint actualPaymentDate;//date at which borrower pays back
        uint tenure;
        uint amount;
    }
    
    function registerLender(string name,uint roi) public {
        Lender memory newLender = Lender({
           selfAdd:msg.sender,
           name:name,
           roi:roi
        });
        
        lenders.push(newLender);
        isLender[msg.sender]=true;
    }
    
    function showLender(uint index) public view returns(Lender) {
        return lenders[index];
    }
    
    //function showLenders(uint startIndex, uint endIndex,bool sort) public payable returns(Lender[]) { }
    
    function showTransaction(uint index) public view returns(Transaction){
        return allTransactions[index];
    }
    
    function showBorrowerRating(address borroweradd) public view returns(uint){
        Borrower storage borrower = borrowers[borroweradd];
        return borrower.rating;
    }
    
    //function showTransactions(uint startIndex, uint endIndex) public payable returns(string){}
    
    function createRequest(address lender,uint amount, uint tenure) public  {
        Request memory request = Request({
             state: States.REQUESTED,
             lender: lender,
             borrower: msg.sender,
             tenure: tenure,
             amount: amount,
             paymentDate:0,
             actualPaymentDate:0
            });
        Request[] storage requests =  lenderRequests[lender];
        requests.push(request);
    }
    //ui is supposed to maintain the index
    function showLenderRequests(uint index) public view onlyLender(index) returns(Request){
        Request[] storage requests = lenderRequests[msg.sender];
        return requests[index];
    } 
    
    //ui is supposed to maintain the index
    function approveRequest(uint index,bool approved) public payable onlyLender(index){
        Request[] storage requests = lenderRequests[msg.sender];
        Request storage request = requests[index];
        if(approved){
            request.borrower.transfer(request.amount);
            request.state = States.APPROVED;
            allTransactions.push(Transaction(request.lender,request.borrower,request.amount));
        }else{
            request.state = States.REJECTED;
        }
    }
    //ui is supposed to maintain the index
    function closeRequest(uint index,uint score) public onlyLender(index){
        //score should be out of 10
        require(score<=10);
        //calculate the new rating
        Request storage request = lenderRequests[msg.sender][index];
        Borrower storage borrower = borrowers[request.borrower];
        uint oldrating = borrower.rating; 
        //update score of the borrower
        uint normalizedVal = (90/oldrating);
        uint newRating = (normalizedVal+score)/100;
        borrower.rating = newRating;
        
        //close the Request
        request.state = States.CLOSED;
        
    }
    
    modifier onlyLender(uint index){
        require(isLender[msg.sender]);
        Request storage request = lenderRequests[msg.sender][index];
        require(msg.sender==request.lender);
        _;
    }
    
}