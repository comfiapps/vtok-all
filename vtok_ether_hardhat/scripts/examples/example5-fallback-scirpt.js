const hre = require('hardhat')
const { ethers, web3 } = require('hardhat')

async function logBalnce(name, address) {
    const balance = await ethers.provider.getBalance(address)
    console.log(`${name} balnce = ${balance}`)
}

async function contractReceiveEther_hre() {

    const [owner, second] = await ethers.getSigners()

    const SendEther = await ethers.getContractFactory('SendEther', second)
    const sendEther = await SendEther.deploy()
    await sendEther.deployed()

    const ReceiveEther = await ethers.getContractFactory('ReceiveEther', second)
    const receiveEther = await ReceiveEther.deploy()
    await receiveEther.deployed()

    await logBalnce('before', second.address)

    const tx = await sendEther.sendViaCall(receiveEther.address, 
        {
            from: second.address, 
            value: web3.utils.toWei('1', 'ether'),
        })

    await tx.wait()

    await logBalnce('after', second.address)
    await logBalnce('contract ether', receiveEther.address)

    let contractBalance = await receiveEther.getBalance()
    console.log(`contract Getbalance() = ${contractBalance}`)
}

async function fallback_hre() {
    
    const [owner, second] = await ethers.getSigners()
    console.log(`address = ${owner.address}`)

    const SendToFallback = await ethers.getContractFactory('SendToFallback', second)
    const sendToFallback = await SendToFallback.deploy()

    await sendToFallback.deployed()

    await logBalnce('owner', owner.address)
    await logBalnce('second', second.address)

    let tx = await sendToFallback.transferToFallback(second.address, 
        {
            from: second.address,
            value: web3.utils.toWei('1', 'ether'),
        })

    let receipt = await tx.wait()
    receipt.events.filter((x) => {
        console.log(x)
    })

    await logBalnce('owner', owner.address)
    await logBalnce('second', second.address)
}

async function main() {

    hre.run('compile')

    await contractReceiveEther_hre()
    //await fallback_hre()
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })