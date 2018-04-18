## microlending-platform
Enables microlending over trust based network using blockchain.

Features :
 1. Anyone can register themselves as lender ( Name,Rate of Interest).
 2. Anyone can register themselves as borrower ( Name ).
 3. View lenders available on the platform (Address, Name, Rate of Interest).
 4. Register Borrower ( Name ).
 5. Create Request ( Registered Borrowers can request for funds ).
 6. Borrowers can browse through their requests and make payments to the lenders.
 7. Anyone can browse through all the transactions.
 8. Lenders can browse through their requests queue ( Approve, Reject, View Borrower Rating, Close Request (Once request moves to "BORROWER_PAID" state, submit Borrower Rating ).
 9. There is no EMI option. Loan has to be paid in full at once.

## Run locally and test :

  # Prerequsites :

    1. Metamask Installed in browser ( Available as chrome plugin ).
    2. Add the following private keys in metamask
        2.1 e4e0c31c6340909ec71efda986123ed3e34a59856b440d656fa492a3f547bdfa (This is used by script to deploy contract on local private ethereum network )
        2.2 0cc457788a116755f14b313fd08f9506af6cfb248dbce7cbf412e6d3cb48714c
        2.3 c32f9392e934cd2092397d8dbb23e46dc798f7b919a45f513fec7270bc7a06fa

        NOTE : Any of these accounts can be used as lender/borrower. In case more accounts are needed modify run.sh " -a 3 " to "-a <n>".

    3. Docker installed on local machine and docker engine running.
    4. Node js installed on local machine.

  # Run the server
    1. sh run.sh
      --  Builds the contract. Deploys the contract. Starts local server and hosts the UI. It also holds the terminal for displaying node server logs.

  # kill the server
    1. `crtl+c` will kill the server.
    2. docker stop `cat process.pid` will stop the local ethereum blockchain.
