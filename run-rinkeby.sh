#!bin bash

nodepath=`which npm`

if [ -z != $nodepath ]
  then
    echo "Node already installed"
  else
    echo " Install node and continue, exiting...... "
    exit
fi

newDeploy=$1

if [ "$newDeploy" = true ]
then
  echo "Deploying new contract to rinkeby, address available in src/address-rinkeby.json"
  node deploy-rinkeby.js
else
  echo "Using deployed contract, address available in src/address-rinkeby.json"
fi
  echo "starting node server"
  REACT_APP_RINKEBY=true npm start
