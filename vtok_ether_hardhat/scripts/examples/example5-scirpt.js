const hre = require('hardhat')
const { ethers, web3 } = require('hardhat')

async function contractCall_hre() {
    const [,account] = await ethers.getSigners()

    // Receiver 배포
    const Receiver = await ethers.getContractFactory('Receiver', account)
    const receiver = await Receiver.deploy()

    let r = await receiver.deployed()
    let rec = await r.deployTransaction.wait()
    rec.events?.filter((x) => {
        console.log(x)
    })

    // Caller 배포
    const Caller = await ethers.getContractFactory('Caller', account)
    const caller = await Caller.deploy()

    let r2 = await caller.deployed()
    let rec2 = await r2.deployTransaction.wait()

    // Received event 등록
    receiver.on('Recevied', async (caller, amount, message) => {
        console.log('======= Received event ====')
        console.log(`caller = ${caller}, amount = ${amount}`)
        console.log(`message = ${message}`)
        console.log('===========================')
    })

    // Caller event 등록
    caller.on('Response', async (success, data) => {
        console.log('======= Response event ====')
        console.log(`success = ${success}`)
        console.log(`data = ${data}`)
        console.log('===========================')
    })

    let tx = await caller.testCallFoo(receiver.address, 
        {
            from: account.address, 
            value: web3.utils.toWei('1', 'ether')
        })

    let receipt = await tx.wait()
    receipt.events?.filter(logReceiveEvent)

    tx = await caller.testCallDoesNotExist(receiver.address)

    let balance = await ethers.provider.getBalance(receiver.address)
    console.log(`receiver balance = ${balance}`)
}

async function contractDelegateCall_hre() {
    const [owner] = await ethers.getSigners()

    console.log(`owner address = ${owner.address}`)

    // Receiver 배포
    const DelegateContract = await ethers.getContractFactory('DelegateContract')
    const delegateContract = await DelegateContract.deploy()

    await delegateContract.deployed()

    console.log(`delegateContract addresss = ${delegateContract.address}`)

    // Caller 배포
    const DelegateCaller = await ethers.getContractFactory('DelegateCaller')
    const delegateCaller = await DelegateCaller.deploy()

    await delegateCaller.deployed()

    console.log(`delegateCaller addresss = ${delegateCaller.address}`)

    let tx = await delegateCaller.setVars(delegateContract.address, 100)
    await tx.wait()

    let setAddress = await delegateContract.sender()
    console.log(`delegateContract sender = ${setAddress}`)

    let setNum = await delegateContract.num()
    console.log(`delegateContract num = ${setNum}`)

    setAddress = await delegateCaller.sender()
    console.log(`delegateCaller sender = ${setAddress}`)

    setNum = await delegateCaller.num()
    console.log(`delegateCaller num = ${setNum}`)
}

async function functionSelector_hre() {

    const FunctionSelector = await ethers.getContractFactory('FunctionSelector')
    const functionselector = await FunctionSelector.deploy()

    await functionselector.deployed()

    //keccak256('transfer(address,uint256)') 으로 나온 bytes 값 중 앞 byte4를 함수 구분자로 사용
    // bytecode에서 byte4값으로 함수를 구분 한다.
    await functionselector.getSelector('transfer(address,uint256)')
    await functionselector.getSelector('transfer(address,uint256,uint256)')
}

async function main() {

    await hre.run('compile')

    //await contractCall_hre()
    //await contractDelegateCall_hre()
    await functionSelector_hre()
}

function logReceiveEvent(x) {
    if (x.event !== 'Response') {
        return
    }

    console.log(x.args)
}

main().then(() => process.exit(0))