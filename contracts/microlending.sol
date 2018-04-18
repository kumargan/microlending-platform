pragma solidity ^0.4.21;
pragma experimental ABIEncoderV2;
//do not allow same lender to register itself as different lenders( use unique identifier )
contract microlending_platform {
    
    Lender[] public lenders;
    //Borrower[] public borrowers;
    Transaction[] public allTransactions;
    mapping(address=>bool) isLender;
    mapping(address=>Borrower) borrowers;
    mapping(address=>Request[]) lenderRequests;
    mapping(address=>Request[]) borrowerRequests;
    
    enum States { REQUESTED , APPROVED, REJECTED ,BORROWER_PAID, CLOSED }
    
    function microlending_platform() public {
        
    }
    
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
    
    function showLender(uint index) public view returns(string,uint,address) {
        return (lenders[index].name,lenders[index].roi,lenders[index].selfAdd);
    }

    function numberOfLenders() public view returns(uint) {
        return lenders.length;
    }
    
    //function showLenders(uint startIndex, uint endIndex,bool sort) public payable returns(Lender[]) { }
    
    function showTransaction(uint index) public view returns(address,address,uint){
        return (allTransactions[index].sender,allTransactions[index].receiver,allTransactions[index].amount);
    }
    
    function showBorrowerRating(address borroweradd) public view returns(uint){
        Borrower storage borrower = borrowers[borroweradd];
        return borrower.rating;
    }
    
    function createBorrower(string name) public {
        Borrower memory borrower = Borrower({
            selfAdd:msg.sender,
            name : name,
            rating : 10
        }) ;    
        
        borrowers[msg.sender]=borrower;
    }
    
    //used by borrower to see his requests
    function showBorrowerRequest(uint index) public view returns(address,uint,uint,uint,uint){
        Request storage request = borrowerRequests[msg.sender][index];
        return (request.lender,uint(request.state),request.paymentDate,request.tenure,request.amount);
    }
    
    function makeBorrowerPayment(uint index)public payable {
        
        Request storage request = borrowerRequests[msg.sender][index];
        require(msg.value>=request.amount);
        request.lender.transfer(request.amount);
        request.state = States.BORROWER_PAID;
        request.actualPaymentDate = now;
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
        Request[] storage bRequests = borrowerRequests[msg.sender];
        requests.push(request);
        bRequests.push(request);
    }
    //ui is supposed to maintain the index
    function showLenderRequests(uint index) public view onlyLender(index) returns(address,uint,uint,uint,uint){
        Request storage request = lenderRequests[msg.sender][index];
        return (request.borrower,uint(request.state),request.paymentDate,request.tenure,request.amount);
    } 
    
    //ui is supposed to maintain the index
    function approveRequest(uint index,bool approved) public payable onlyLender(index){
        Request[] storage requests = lenderRequests[msg.sender];
        Request storage request = requests[index];
        if(approved){
            request.borrower.transfer(request.amount);
            request.state = States.APPROVED;
            allTransactions.push(Transaction(request.lender,request.borrower,request.amount));
            request.paymentDate = now+(request.tenure*60*60*24);
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
        
        uint newRating = ((oldrating+newRating)/20)*10;
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