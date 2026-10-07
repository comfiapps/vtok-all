const { web3, Web3 } = require('hardhat')
const hre = require('hardhat')

const keytheruem = require('keythereum')

// contract 배포 전에 관련 정보 조사
async function getBlockInfo() {

    // gasPrice 조회
    let gasPrice = await web3.eth.getGasPrice()

    let eth = web3.utils.fromWei(gasPrice)
    console.log('gas price [wei: %s, eth: %s]',gasPrice, eth)

    // 최신 block 정보 가져오기
    let block = await web3.eth.getBlock('latest')

    // gaslimit 조사
    console.log('latest block gas limit = %d', block.gasLimit)
}

// contract 배포
// Contract send 기능을 이용한 Contract Deploy
async function contractDeploy_1() {

    // default account 설정하기
    // Contact에 from이 설정 되어 있지 않으면.. default 계정이 사용 된다.
    let [,,addr] = await web3.eth.getAccounts()
    web3.eth.defaultAccount = addr

    // balance 얼마나 있나?
    let beforeBalance = await web3.eth.getBalance(addr)
    console.log(beforeBalance + ' wei')

    const SimpleStorage = hre.artifacts.require("SimpleStorage")

    // abi, bytecode 가져오기
    let abi = SimpleStorage.abi
    let bytecode = SimpleStorage.bytecode

    // 계정 잠금 해제 해야 한다!!!
    let success = await web3.eth.personal.unlockAccount(addr, '1111')
    if(success == false) {
        console.log('account unlock failed')
    }

    var newContract = new web3.eth.Contract(abi)
    let contractIns = await newContract.deploy(
        {
            data: bytecode,
            //arguments: [] // 생성시 전달되어야 한 인수들..
        }
    ).send({
        from: addr,
        gas: 210000,
        gasPrice: '1000000000',
    }, (error, transactionHash) => {
        console.error('error = ' + error)
        console.error('transactionHash = ' + transactionHash)
    })
    .on('receipt', (receipt) => {
        console.log('contract address = ' + receipt.contractAddress)
    })
    .on('confirmation', (conf, receipt) => {
        console.log(conf)
        console.log(receipt)
    })
    
    console.log(contractIns)

    // 다시 계정 잠금
    success = await web3.eth.personal.lockAccount(addr)
    console.log('lock success = ' + success)

    // transaction 보내고 남은 balance
    // balance 얼마나 있나?
    let afterBalance = await web3.eth.getBalance(addr)
    console.log(afterBalance + ' wei')
}

// contract 배표
// web3.eth.account.signTransaction 기능을 이용한 Contract Deploy 
async function contractDeploy_2() 
{
    let [,,addr] = await web3.eth.getAccounts()

    // balance 얼마나 있나?
    let beforeBalance = await web3.eth.getBalance(addr)
    console.log(beforeBalance + ' wei')

    let dataDir = '/Users/bjunjo/geth/ethereum_private'
    let keyObject = keytheruem.importFromFile(addr, dataDir)
    let rawPrivateKey = keytheruem.recover('1111', keyObject)

    let addr_account = web3.eth.accounts.privateKeyToAccount('0x' + rawPrivateKey.toString('hex'))

    /// Contract abi, bytecode 가져오기
    const SimpleStorage = hre.artifacts.require("SimpleStorage")
    // abi, bytecode 가져오기
    let abi = SimpleStorage.abi
    let bytecode = SimpleStorage.bytecode

    var newContract = new web3.eth.Contract(abi)
    let deployHandle = await newContract.deploy({
                data: bytecode,
                //arguments: [] // 생성시 전달되어야 한 인수들..
            })
    
    // 가스 추정하기!!! Gas 비용
    const esimateGas = await deployHandle.estimateGas({
        from: addr_account.address
    })
    console.log('esimateGas ' + esimateGas)
    
    let options = {
        data: deployHandle.encodeABI(),
        gas: esimateGas,
    }

    let signedTransaction = await addr_account.signTransaction(options)
    let receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)

    console.log(receipt)

    // contract 0x3594954EF6B88031Be54B2c71ab97e31F5ac226e

    /*
    let receipt = await deployHandle.send({
        gas: esimateGas,
        gasPrice: web3.utils.toWei('1', 'gwei'),
    })
    */


    /*
    let txCount = await web3.eth.getTransactionCount(addr_account.address)
    const txObject = {
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(1000000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('1', 'gwei')),
        value: '0x00',
        data: bytecode,
    }
    */


    console.log(receipt)

    // balance 얼마나 있나?
    let afterBalance = await web3.eth.getBalance(addr)
    console.log(afterBalance + ' wei')
}

// contract 사용
async function contractUse_1(contractAddr) {
    let [,,addr] = await web3.eth.getAccounts()

    /// Contract abi, bytecode 가져오기
    const SimpleStorage = hre.artifacts.require("SimpleStorage")
    // abi, bytecode 가져오기
    let abi = SimpleStorage.abi

    let contract = new web3.eth.Contract(abi, contractAddr)

    // event  등록
    contract.events.Log()
    .on('data', (event) => {
        console.log(event)

        let newValue = event.returnValues.num
        console.log(`from event = ${newValue}`)
    })


    // 값 가져오기
    let result = await contract.methods.get().call()
    console.log(result)

    await web3.eth.personal.unlockAccount(addr, '1111')

    let options = {
        from: addr,
    }

    // method gas 추정
    let esimateGas = await contract.methods.set(500).estimateGas({
        from: addr,
    })

    console.log('get method esimateGas = ' + esimateGas)

    let receipt = await contract.methods.set(500).send(options)
    console.log(receipt)

    await web3.eth.personal.lockAccount(addr)

    result = await contract.methods.get().call()
    console.log(result)

}

// contract 사용 
// 
async function contractUse_2(contractAddr) {

    let [,,addr] = await web3.eth.getAccounts()
    
    let dataDir = '/Users/bjunjo/geth/ethereum_private'
    let keyObject = keytheruem.importFromFile(addr, dataDir)
    let rawPrivateKey = keytheruem.recover('1111', keyObject)

    let addr_account = web3.eth.accounts.privateKeyToAccount('0x' + rawPrivateKey.toString('hex'))


    /// Contract abi, bytecode 가져오기
    const SimpleStorage = hre.artifacts.require("SimpleStorage")
    // abi, bytecode 가져오기
    let abi = SimpleStorage.abi

    let contract = new web3.eth.Contract(abi, contractAddr)

    // 가져오는건 call을 써야 한다!
    let result = await contract.methods.get().call({
        from: addr_account.address
    })

    console.log('num = ' + result)

    let extraData = await contract.methods.set(220)

    let nonce = await web3.eth.getTransactionCount(addr_account.address)

    let txObject = {
        nonce: nonce,
        from: addr_account.address,
        to: contractAddr,
        data: extraData.encodeABI(),
        gas: 210000,
        gasPrice: web3.utils.toWei('1', 'gwei'),
    }

    let signedTransaction = await addr_account.signTransaction(txObject)
    let receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
    console.log(receipt)

    result = await contract.methods.get().call({
        from: addr_account.address
    })

    console.log('num = ' + result)
}

async function main() {

    // provider setting
    let isSuccess = web3.setProvider(new Web3.providers.WebsocketProvider('ws://127.0.0.1:8545'))
    if(isSuccess == false) {
        console.log('provider set failed')
        return
    }
    
    const [,,addr] = await web3.eth.getAccounts()

    // 새로운 block 생성 event 구독
    web3.eth.subscribe('newBlockHeaders', (error, blockHeader) => {
        console.log('subscribe = ' + error)
        console.log('blockHeader = ' + blockHeader)
    })

    // 
    web3.eth.subscribe('logs', {
        address: addr,
    }, (error, result) => {

        console.log(`error =  ${error}`)
        console.log(`result =  ${result}`)
    })

    //

    await getBlockInfo()

    //await contractDeploy_1()
    //await contractDeploy_2()

    // [deploy_1]][address : 0x9BA85db6AA346EB395ce3297C1f090B3618F07c6][SimpleStorage]
    // [deploy_2]][address : 0x7F56dE2A2E66C00879B173aEdB5a456d85730371][SimpleStorage]

    await contractUse_1('0x7F56dE2A2E66C00879B173aEdB5a456d85730371')
    //await contractUse_2('0x9BA85db6AA346EB395ce3297C1f090B3618F07c6')

    // 생성 된 Contract [ 0x48d7055Ae95D66EBBe446E58044521889242FbAD ]
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error)
    process.exit(1)
})