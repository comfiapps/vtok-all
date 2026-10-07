//const Web3 = require('web3')

const { web3, Web3 } = require('hardhat')
const hre = require('hardhat')
const keytheruem = require('keythereum')

/// @nomiclabs/hardhat-truffle5 에서 이미 web3 생성 및 provider 주입을 해놓았다.
/// hardhat을 사용한 web3.eth.personal 은 rpc 통신에서 제외 되어 있어
/// 별도 geth private network를 구동하여야 한다.
async function queryWeb3Accounts() {

    // 게정 정보 가져오기 (현재 node가 들고 있는 account들..)
    let accounts = await web3.eth.getAccounts()
    for(account of accounts)
    {
        console.log('address = ' + account)
    }

    let [owner] = accounts

    // 특정 계정 이더 보유량 가져오기
    let balance = await web3.eth.getBalance(seconds)
    let etherBalance = web3.utils.fromWei(balance)
    console.log(etherBalance)
}

// block에 저장 되지 않는다!!
async function somethingSigned() {
    
    let [owner] = await web3.eth.getAccounts()

    // 서명 (특정값을 서명하여) Hash코드를 생성
    let sigend = await web3.eth.personal.sign('specify word 123123123', owner, '1111')
    console.log(sigend)

    // 서명 된 Hash코드와 서명 되기 전 값으로 서명한 계정을 반환
    let ecRec = await web3.eth.personal.ecRecover('specify word 123123123', sigend)
    console.log(ecRec)
}

// web3.eth.personal RPC로 접속한 노드가 제어하는 계정 관리
// keystore에 생성한다.
async function createPersonalAccount() 
{
    // 계정 생성
    // !!암호가 일반 텍스트로 전송되므로 보안되지 않은 Websocket 또는 HTTP 공급자를 통해 이 함수를 호출하지 마십시오!
    let newAddress = await web3.eth.personal.newAccount('1111', (error, address) => {
        console.log('error = ' + error)
        console.log('address = ' + address)
    })
    console.log(newAddress)
}

// 노드에 저장 되어있는 address에 대한 privatekey 가져오기
// node와 같은 머신에서 수행되어야 하는 로직
async function getPersonalPrivateKey() 
{
    let targetAddress = '0xad6dc116ac5c04e750f7b6c621527ee62939f039'

    let dataDir = '/Users/bjunjo/geth/ethereum_private'
    const password = '1111'

    let keyObject = keytheruem.importFromFile(targetAddress, dataDir)
    let privateKey = keytheruem.recover(password, keyObject)

    let privateKeyString = privateKey.toString('hex')

    // 12ef0ea420b65d14035b7d1f6399f7786165cff7112142449980c4cefbab41d2
    console.log('private key ' + privateKeyString)

    // 비밀키로 공개키 복구
    let newAddress = await web3.eth.personal.importRawKey(privateKeyString, password)
    console.log(newAddress)
}


// 실제로 물리 공간에 저장 되지 않는 상태
async function handleAccount() {

    let account = web3.eth.accounts.create('1111')
    console.log(account)

    console.log(`address = ${account.address}`)
    console.log(`privatekey = ${account.privateKey}`)

    // privatekey로부터 address 복구
    let recoverAccount = web3.eth.accounts.privateKeyToAccount(account.privateKey)

    console.log(`recover address = ${recoverAccount.address}`)
    console.log(`recover privatekey = ${recoverAccount.privateKey}`)

    //Balance 조회
    let balance = await web3.eth.getBalance(recoverAccount.address)
    console.log(`${balance} wei`)
}

// 간단하게 ether 보내기
async function transferEther() {
    const [owner] = await web3.eth.personal.getAccounts()
    //console.log(owner)

    await web3.eth.personal.unlockAccount(owner, '1111')

    const receipt = await web3.eth.sendTransaction({
        from: owner,
        to: '0x143ad27c4C636D1f659eFDe34c67E72714E7b4ee',
        value: web3.utils.toWei('100', 'ether')
    })

    console.log(receipt)

    await web3.eth.personal.lockAccount(owner)
}

async function main() {

    // provider setting
    //let isSuccess = web3.setProvider(new Web3.providers.HttpProvider('http://172.30.1.202:8545'))
    let isSuccess = web3.setProvider(new Web3.providers.WebsocketProvider('ws://172.30.1.202:8545'))
    if(isSuccess == false) {
        console.log('provider set failed')
        return
    }

    //await queryWeb3Accounts()
    //await somethingSigned()
    //await createPersonalAccount()

    //await getPersonalPrivateKey()

    //await handleAccount()

    await transferEther()
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })