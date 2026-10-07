
const { web3, Web3 } = require('hardhat')
const hre = require('hardhat')

/// web3 provider 셋팅
async function initWeb3Provider() {
    let isSuccess = web3.setProvider(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))
    console.log('privder set = ' + isSuccess)

    // 1. 초기화 방법 (http)
    //let web3 = new Web3('http://localhost:8545')
    //console.log('web3 version = ' + web3.version)

    // 2. 초기화 방법
    //let web3 = new Web3(http)
    //web3.setProvider(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))
    //console.log('web3 version = ' + web3.version)

    /*
    // http provider
    let http_provider = new Web3.providers.HttpProvider('')
    
    // web socket Provider
    let websocket_provider = new Web3.providers.WebsocketProvider('')

    // ipc provider
    let ipc_provider = new Web3.providers.IpcProvider('')
    */
}


/// subscribe 역할이 무엇인가??
async function web3Subscribe() {
    // 블록체인에서 특정 이벤트를 구독 할 수 있다.
    web3.eth.subscribe('logs', {}, (error, result) => {
        console.log('sub logs error = ' + error)
        console.log('sub logs result = ' + result)
    })
}