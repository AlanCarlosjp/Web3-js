
let btn = document.querySelector('button');

btn.addEventListener('click',()=>{

    login();

})

async function login(){

if(window.ethereum){

        //Inicializar carteira.

        var web3 = new Web3(window.ethereum);
        try{
            const eth = window.ethereum;
            const accounts = await ethereum.request({method:'eth_requestAccounts'});
            const account = accounts[0];
            console.log(account);

            const sign = await ethereum.request({method:'personal_sign',params:['Mint no website meu site de teste',account]});

            //A partir daqui chamar contrato inteligente.
            let contract = new Web3.eth.Contract([
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "previousOwner",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "newOwner",
                            "type": "address"
                        }
                    ],
                    "name": "OwnershipTransferred",
                    "type": "event"
                },
                {
                    "inputs": [],
                    "name": "owner",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "renounceOwnership",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "newOwner",
                            "type": "address"
                        }
                    ],
                    "name": "transferOwnership",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                }
            ],"");

            let mint = await contract.methods.safeMint(account).send({from:account,value: 1});
        }catch(e){}

    }else{

        alert('Instale sua carteira...');

    }

}