#!bin bash
unset DOCKER_HOST

file="process.pid"
if [ -f "$file" ]
then
	docker stop `cat process.pid`
fi
cp /dev/null process.pid

docker images | grep trufflesuite/ganache-cli
if [ $? -ne 0 ]
then
  echo "run the following commands to initialize the setup, and run the script again "
  echo "git clone https://github.com/trufflesuite/ganache-cli.git && cd ganache-cli"
  echo "docker build -t trufflesuite/ganache-cli ."
  exit 0
else
  docker run -d -p 8545:8545 trufflesuite/ganache-cli:latest -a 3 -u 0 -u 1 -u 2 > process.pid
  sleep 10
  echo "use the following private keys for metamask, import the keys in metamask to get the unlocked accounts"
  docker logs `cat process.pid` | grep -n "(0)" | grep "11:(0)"
  docker logs `cat process.pid` | grep -n "(1)" | grep "12:(1)"
  docker logs `cat process.pid` | grep -n "(2)" | grep "13:(2)"
  ## deploy the contract on ganache
  docker logs `cat process.pid` | grep "Mnemonic:" > mnemonic.txt
  mnemonic=`cat mnemonic.txt` node deploy.js
  echo "starting node server"
  cd ui
  npm start
  cd ..
fi
