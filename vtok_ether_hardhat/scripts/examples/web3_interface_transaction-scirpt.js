const { web3, Web3 } = require('hardhat')
const keytheruem = require('keythereum')


// sign을 과정을 거치지 않고 transaction을 보내는 방법.
// sign 과정은 node에서 진행하게 된다. (unlock은 그것을 위한 준비 과정인듯?)
// node에서 account 정보가 존재 해야 한다.
async function transfer() 
{
    let [_, addr_2, addr_3] = await web3.eth.getAccounts()

    let addr_2_beforeBalance = await web3.eth.getBalance(addr_2)
    console.log('addr_2 beforeBalance = ' + addr_2_beforeBalance)

    let addr_3_afterBalance = await web3.eth.getBalance(addr_3)
    console.log('addr_3 beforeBalance = ' + addr_3_afterBalance)

    // 이더를 보내는 주소는 잠금 해제를 해야 한다!
    let success = await web3.eth.personal.unlockAccount(addr_2, '1111')
    if(success == false) {
        console.log('account Unlock failed')
        return
    }

    // 이더 보내기
    let receipt = await web3.eth.sendTransaction({
        from: addr_2,
        to: addr_3,
        value: web3.utils.toWei('0.0005', 'ether'),
        gasPrice: 1000000000 + 100000000,
    })
    .on('sending', (payload) => {
        console.log('payload = ' + payload)
    })
    .on('transactionHash', (receipt) => {
        console.log('transactionHash = ' + receipt)
    })
    .on('receipt', (receipt) => {
        console.log('receipt = ' + receipt)
    })
    .on('confirmation', (confnumber, receipt) => {
        console.log('confnumber = ' + confnumber)
        console.log('receipt = ' + receipt)
    })

    success = await web3.eth.personal.lockAccount(addr_2, '1111')
    console.log('account lock = ' + success)
    // sendTransaction 주요 Option 종류
    // from : 보내는 주소
    // to : 받는 주소
    // gas : 
    // gasPrice : gas 단위 당 비용 (defualt. web3.eth.getGasPrice()) 이 가격을 올려서 트렌젝션 우선순위를 높인다.
    // 

    console.log(receipt)
    // receipt.cumulativeGasUsed : 21000  개수 단위 이다.()
    // effectiveGasPrice : 0x3b9aca00  (gas의 단위(unit) 이다)
    // gasUsed : 21000

    addr_2_beforeBalance = await web3.eth.getBalance(addr_2)
    console.log('addr_2 beforeBalance = ' + addr_2_beforeBalance)

    addr_3_afterBalance = await web3.eth.getBalance(addr_3)
    console.log('addr_3 beforeBalance = ' + addr_3_afterBalance)
}

// sign을 과정을 거치고 transaction을 보내는 방법.
async function signedTransfer() {

    let [,,addr_1, addr_2] = await web3.eth.getAccounts()

    let addr_1_beforeBalance = await web3.eth.getBalance(addr_1)
    console.log('addr_1 beforeBalance = ' + addr_1_beforeBalance)

    let addr_2_afterBalance = await web3.eth.getBalance(addr_2)
    console.log('addr_2 beforeBalance = ' + addr_2_afterBalance)

    // privateKey가 필요하다..
    let dataDir = '/Users/bjunjo/geth/ethereum_private'
    const password = '1111'

    let keyObject = keytheruem.importFromFile(addr_1, dataDir)
    let rawPrivateKey = keytheruem.recover(password, keyObject)

    let privateKey = rawPrivateKey.toString('hex')
    privateKey = '0x' + privateKey
    console.log('privateKey = ' + privateKey)

    // txCount 는 nonce 값이 된다.
    let txCount = await web3.eth.getTransactionCount(addr_1)
    console.log(txCount)

    const txObject = {
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(1000000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        from: addr_1,
        to: addr_2,
        value: web3.utils.toHex(web3.utils.toWei('0.001', 'ether'))
    }

    // 방법 1.
    let addr_1_account = web3.eth.accounts.privateKeyToAccount(privateKey)
    let signedTransaction = await addr_1_account.signTransaction(txObject)

    const raw = signedTransaction.rawTransaction

    // 방법 2.
    //const serializedTx = await web3.eth.accounts.signTransaction(txObject, privateKey)
    //const raw = serializedTx.rawTransaction
    //console.log(raw)

    const receipt = await web3.eth.sendSignedTransaction(raw)
    .on('transactionHash', (hash) => {
        // transaction이 노드에 도착
        console.log('transactionHash = ' + hash)
    })
    .on('receipt', (receipt) => {
        // transaction이 블로에 들어감
    })
    .on('error', (error) => {
        // 에러 발생
        console.log('error = ' + error)
    })

    console.log(receipt)

    addr_1_beforeBalance = await web3.eth.getBalance(addr_1)
    console.log('addr_1 beforeBalance = ' + addr_1_beforeBalance)

    addr_2_afterBalance = await web3.eth.getBalance(addr_2)
    console.log('addr_2 beforeBalance = ' + addr_2_afterBalance)
}

async function main() {
    let isSuccess = web3.setProvider(new Web3.providers.WebsocketProvider('ws://127.0.0.1:8545'))
    if(isSuccess == false) {
        console.log('provider set failed')
        return
    }
    
    // gas 1개당 가격
    let price = await web3.eth.getGasPrice()
    console.log(price + ' wei')

    //let block = await web3.eth.getBlock('latest')
    //console.log('block.baseFeePerGas = ' + block.baseFeePerGas)
    //await transfer()

    await signedTransfer()
}

main().then(() => process.exit(0))