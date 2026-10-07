const { keccak256 } = require('ethers/lib/utils')
const hre = require('hardhat')
const { ethers, web3, Web3, artifacts } = require('hardhat')

async function tryCatch_hre() {

    const Bar = await ethers.getContractFactory('Bar')
    const bar = await Bar.deploy()
    
    await bar.deployed()

    bar.on('Log', async (message) => {
        console.log(`from Log = ${message}`)
    })

    bar.on('LogBytes', async (data) => {
        console.log(`from LogBytes = ${data}`)
    })

    let tx = await bar.tryCatchExternalCall(0)
    let receipt = await tx.wait()
    receipt.events?.filter(printEvent)

    let wroungAddr = ethers.utils.getAddress('0x0000000000000000000000000000000000000001')

    tx = await bar.tryCatchNewContract(wroungAddr)
    receipt = await tx.wait()
    receipt.events?.filter(printEvent)

    // event를 받는데 4초 interval 시간있다.(in-process hardhat)
    // 5초 대기 시간을 두면 .on('event') 메세지를 받을 수 있다.
    /*
    await new Promise(res => setTimeout(() => {
        res(null)
    }, 5000))
    */
}

function printEvent(x) {
    if(x.event === 'Log') {
        console.log(`refrom receipt Log = ${x.args['message']}`)
    }
    else if(x.event === 'LogBytes') {
        console.log(`refrom receipt LogBytes = ${x.args['data']}`)
    }
}

async function library_hre() {
    // npx hardhat node로 수행 후 websocket으로 연결
    let provder = new ethers.providers.WebSocketProvider('ws://127.0.0.1:8545')
    ethers.provider = provder

    const [owner] = await ethers.getSigners()

    // 외부에서 library 사용 방법
    const ArrayLib = await ethers.getContractFactory('ArrayLib')
    const arraylib = await ArrayLib.deploy()

    await arraylib.deployed()

    const TestArray = await ethers.getContractFactory('TestArray', {
        libraries: {
            ArrayLib: arraylib.address,
        }
    })
    const testArry = await TestArray.deploy()

    await testArry.deployed()

    await testArry.testArrayRemove()
}

async function library_web3() {

    // npx hardhat node로 수행 후 websocket으로 연결
    const web3 = new Web3('ws://127.0.0.1:8545')
    let [owner_addr] = await web3.eth.getAccounts()
    console.log(`owner = ${owner_addr}`)

    let owner_account = web3.eth.accounts.privateKeyToAccount('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80')

    var deployHandle
    var estimateGas
    var options
    var signedTransaction
    var receipt

    
    let ArrayLibArtifact = hre.artifacts.require('ArrayLib')
    const ArrayLib = new web3.eth.Contract(ArrayLibArtifact.abi)
    deployHandle = ArrayLib.deploy({
        data: ArrayLibArtifact.bytecode,
    })

    estimateGas = await deployHandle.estimateGas({from: owner_account.address})
    options = {
        data: deployHandle.encodeABI(),
        gas: estimateGas,
    }

    signedTransaction = await owner_account.signTransaction(options)
    receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)

    let arrayLibAddress = receipt.contractAddress
    console.log('arrayLibAddress = ' + arrayLibAddress)

    //
    let libraryContractKeccak = keccak256(ethers.utils.toUtf8Bytes('contracts/examples/Example7.sol:ArrayLib'))
    // 0xfa1a81e0a5d73ce945b218282c9f6ab8254daf8f7ccf29f0d884f9ff267ce9f7
    // 앞 부분 34 Character 가 실제 사용되는 Contract 내부에 __$xxx$__ 로 표현 되어
    // 해당 Library 배포 address로 바뀌어야 한다.

    // 0x 제거 후 교체 문자열 변환
    libraryContractKeccak = libraryContractKeccak.substring(0, 36)
    libraryContractKeccak = libraryContractKeccak.replace('0x', '')
    libraryContractKeccak = `__$${libraryContractKeccak}$__`

    //////
    let TestArrayArtifact = hre.artifacts.require('TestArray')
    const TestArray = new web3.eth.Contract(TestArrayArtifact.abi)

    let contractByteCode = TestArrayArtifact.bytecode

    // 앞 0x 제거
    arrayLibAddress = arrayLibAddress.replace('0x', '')
    contractByteCode = contractByteCode.replace(libraryContractKeccak, arrayLibAddress)

    //TestArrayArtifact.bytecode 에서 
    // __$fa1a81e0a5d73ce945b218282c9f6ab825$__ 부분을  arrayLibAddress address로 치환해야 한다.
    // 34 character

    deployHandle = TestArray.deploy({
        data: contractByteCode,
    })

    estimateGas = await deployHandle.estimateGas({from: owner_account.address})
    options = {
        data: deployHandle.encodeABI(),
        gas: estimateGas,
    }

    signedTransaction = await owner_account.signTransaction(options)
    receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)

    let testArrayAddress = receipt.contractAddress
    console.log('testArrayAddress = ' + testArrayAddress)

    //////
    let testArray = new web3.eth.Contract(TestArrayArtifact.abi, testArrayAddress)
    await testArray.methods.testArrayRemove().call()
}

async function main() {
    await hre.run('compile')

    //await tryCatch_hre()

    //await library_hre()
    await library_web3()
}

main().then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })