const hre = require('hardhat')
const { ethers, web3 } = require('hardhat')

/// 다른 contract 불러와서 사용 web3 대응
async function callingOtherContract_hre() {

    const [owner] = await ethers.getSigners()

    const Callee = await ethers.getContractFactory('Callee')
    const callee = await Callee.deploy()

    await callee.deployed()

    const Caller2 = await ethers.getContractFactory('Caller2')
    const caller2 = await Caller2.deploy()

    await caller2.deployed()
    
    await caller2.setXFromAddress(callee.address, 10)

    await caller2.setX(callee.address, 100302)

    let tx = await caller2.setXandSendEther(callee.address, 403, {
        value: web3.utils.toWei('1', 'ether')
    })

    await tx.wait()

    let balance = await callee.getBalance()
    console.log(`balance = ${balance}`)

}

/// 내부에서 contract 생성 web3 대응
async function carFactory_hre() {

    const [, owner] = await ethers.getSigners()

    const CarFactory = await ethers.getContractFactory('CarFactory')
    const carFactory = await CarFactory.deploy()

    await carFactory.deployed()

    let tx = await carFactory.create(owner.address, 'Car 1')
    await tx.wait()

    tx = await carFactory.createAndSendEther(owner.address, 'Car 2', {
        value : web3.utils.toWei('1', 'ether')
    })
    await tx.wait()

    let saltvalue = ethers.utils.formatBytes32String('slatValue')

    tx = await carFactory.create2(owner.address, 'Car 3', saltvalue)
    await tx.wait()

    tx = await carFactory.create2AndSendEther(owner.address, 'Car 4', saltvalue, {
        value : web3.utils.toWei('1', 'gwei')
    })
    await tx.wait()

    //
    let carPrint = (logQuery) => {
        console.log(`owner = ${logQuery.owner}, model = ${logQuery.model}, caraddr = ${logQuery.carAddress}`)
        console.log(`carAddr Balance = ${logQuery.balance}`)
    }

    let query = await carFactory.getCar(0)
    carPrint(query)

    query = await carFactory.getCar(1)
    carPrint(query)

    query = await carFactory.getCar(2)
    carPrint(query)

    query = await carFactory.getCar(3)
    carPrint(query)
}

async function main() {
    await hre.run('compile')

    //await callingOtherContract_hre()
    await carFactory_hre()
}

main().then(() => process.exit(0))