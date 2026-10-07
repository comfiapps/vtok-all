const hre = require('hardhat')
const { ethers, web3 } = require('hardhat')

async function hashFunction_hre() {

    const [owner] = await ethers.getSigners()

    const HashFunction = await ethers.getContractFactory('HashFunction')
    const hashFunction = await HashFunction.deploy()

    await hashFunction.deployed()

    let bytes = await hashFunction.hash('abce', 1000, owner.address)
    console.log(`${bytes}`)
}

async function overflowTest_hre() {

    const OverflowTest = await ethers.getContractFactory('OverflowTest')
    const overflowTest = await OverflowTest.deploy()

    await overflowTest.deployed()

    let result = await overflowTest.currValue()
    console.log(result.toString())

    let tx = await overflowTest.decrement()
    let recipt = await tx.wait()
    console.log(recipt)

    result = await overflowTest.currValue()
    console.log(result.toString())
}

async function main() {

    //hre.ethers.provider = new hre.ethers.providers.WebSocketProvider('ws://127.0.0.1:8545')

    await hre.run('compile')

    //await hashFunction_hre()
    await overflowTest_hre()
}

main().then(() => process.exit(0))