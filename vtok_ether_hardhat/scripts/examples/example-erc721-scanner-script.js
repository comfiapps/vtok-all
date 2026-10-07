const hre = require('hardhat')
const { ethers, web3, Web3 } = require('hardhat')
const { upperFirst } = require('lodash');
const { threadId } = require('worker_threads');


async function scanner2() {

    
    let logs = await web3.eth.getPastLogs({
        fromBlock: 'pending',
        toBlock: 'latest',
        address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
    });

    console.log(logs);
}

async function scanner() {

    const currBlockNumber = await web3.eth.getBlockNumber()

    for(let i = currBlockNumber ; i >= 0 ; --i)
    {
        let  block = await web3.eth.getBlock(i, true)
        if(block === undefined) {
            continue
        }

        for(let transaction of block.transactions)
        {
            const transactionHash = transaction.hash

            console.log(`tx hash ${transactionHash}`)
            console.log(`from =  ${transaction.from}`)
            console.log(`to = ${transaction.to}`)

            if(transaction.to == null)
            {
                let receipt = await web3.eth.getTransactionReceipt(transaction.hash)
                console.log(`contract Depoly = ${receipt.contractAddress}`)
            }
            else
            {
                let code = await web3.eth.getCode(transaction.to)
                console.log(`code = ${code}`);
            }
        }
    }

    //web3.eth.getTransaction()
}

//
async function main() {

    web3.eth.setProvider(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'))

    //await scanner()
    //await scanner2()

    //const interface = new ethers.utils.Interface();

    //interface.parseTransaction()

    //web3.eth.abi.decodeParameters()

    const erc721_abi = require('./abi/opensea-abi.json')
    console.log(erc721_abi)

    let contract = new web3.eth.Contract(erc721_abi)
    //contract.getPastEvents()


    let transaction = await web3.eth.getTransaction('0xa824119a70b87e4689fc16c1d10bb366d477ee1538f47af2e661898c9cc92686')

    let interface = ethers.utils.Interface(erc721_abi)

    let r = web3.utils.toAscii(transaction.input);

    
    let recipt = await web3.eth.getTransactionReceipt('0xa824119a70b87e4689fc16c1d10bb366d477ee1538f47af2e661898c9cc92686')
    let contractaddr = recipt.contractAddress

    let logs = recipt.logs

    // logs 에 기록 0x90d9fB9cd52fd640f589c1e74955eF573ce63Ca6

    console.log(`find contract addr = ${contractaddr}`)
    console.log('finish')

}

main().then(() => process.exit(0))
