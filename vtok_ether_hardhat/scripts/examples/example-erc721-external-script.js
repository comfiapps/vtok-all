// SolarBots
// https://etherscan.io/address/0x8009250878ed378050ef5d2a48c70e24eb2ede7e#code
// 0x8009250878eD378050eF5D2a48c70E24EB2edE7E

const {ethers, web3, Web3, artifacts} = require('hardhat')

/// ERC721 컨트렉트 주소만 알고있는 상황에서
/// tokenURI 컨트렉트 함수를 호출하는 방법 (low level 방법)
async function readERC732TotalSupply_raw(contractAddress) {

    let functionSelector = web3.eth.abi.encodeFunctionSignature('totalSupply()')
    functionSelector = functionSelector.replace('0x', '')
    functionSelector = functionSelector.padEnd(32, '0')

    const result = await web3.eth.call({
        to: contractAddress,
        data: '0x' + functionSelector,
    })

    console.log(result)

    // 0x00000000 00000000 00000000 00000000 000000000 00000000 000000000 003b84

}

/// ERC721 컨트렉트 주소만 알고있는 상황에서
/// tokenURI 컨트렉트 함수를 호출하는 방법 (low level 방법)
async function readERC721metaData_raw(contractAddress, tokenId) {

    // 1. function Selector 생성
    //let functionSelector = web3.eth.abi.encodeFunctionSignature("ownerOf(uint256)")
    let functionSelector = web3.eth.abi.encodeFunctionSignature("tokenURI(uint256)")
    functionSelector = functionSelector.replace('0x', '')

    // 32 characters로 재생성(16BYTE로 구성)  
    functionSelector = functionSelector.padEnd(32, '0')
    console.log(`function selector hex = ${functionSelector}` ) //0xa9059cbb000000000000000000000000
    
    // 2. Parameter Hex 생성
    tokenId = web3.utils.numberToHex(tokenId)
    tokenId = tokenId.replace('0x', '')

    // 40 character로 재생성 (20BYTE로 구성)
    tokenId = tokenId.padStart(40, '0')
    console.log(`token hex = ${tokenId}`) // 00000000000000000000000000000000000392fa

    // payload 생성
    const payload = '0x' + functionSelector + tokenId

    let result = await web3.eth.call({
        to: contractAddress,
        data: payload
    })

    console.log(`raw hex = ${result}`)

    // string (동적 타입 디코딩)
    result = result.replace('0x', '')

    const head = result.substring(0, 64)
    console.log(`result count = ${web3.utils.hexToNumber('0x' + head) / 32}`)

    const tail_string_length = result.substring(64, 128)
    const string_length = web3.utils.hexToNumber('0x' + tail_string_length)
    console.log(`result count = ${string_length}`)

    const tail_string_body = result.substring(128, 128 + string_length*2)

    const url = web3.utils.hexToString('0x' + tail_string_body)
    console.log(`url = ${url}`)


    // 동적 타입
    // Header
    // 128 character 64BYTE (32BYTE / 32BYTE?)
    //  0x0000000000 0000000000 0000000000 0000000000 0000000000 0000000000 0020 // 32 (인수의 갯수) 인수 갯수 * 32
    //  0x0000000000 0000000000 0000000000 0000000000 0000000000 0000000000 0037 // 55 LENGTH? (동적 인코딩 길이)
    
    // Tail body
    //  68747470733a 2f2f6e6674 696f657870 726573732d 6f65757761 2e6f6e6469 676974616c 6f6365616e 2e6170702f 3f69643d33 35303531000 00000000000 0000
}

// ERC721 컨트렉트 주소만 알고 있고, ERC721 interface Abi를 자기고
// tokenURI 컨트렉트 함수를 호출하는 방법
async function readERC721metaData_abi(contractAddress, tokenId) {

    const erc721meatadata_abi = require('./abi/erc721metadata-abi.json')
    console.log(erc721meatadata_abi)

    let contract = new web3.eth.Contract(erc721meatadata_abi, contractAddress)

    let value = await contract.methods.name().call()
    console.log(`name = ${value}`)

    value = await contract.methods.tokenURI(tokenId).call()
    console.log(`url = ${value}`)
    
}

async function readERC721Transaction_abi(contractAddress, tokenId) {
    const erc721_abi = require('./abi/erc721-abi.json')
    console.log(erc721_abi)

    contract = new web3.eth.Contract(erc721_abi, contractAddress)

    let owner = await contract.methods.ownerOf(tokenId).call()
    console.log(`owner = ${owner}`)


    /// Transfer
    const eventDatas = await contract.getPastEvents('Transfer', {
        filter: {tokenId: tokenId},
        fromBlock: 0,
        toBlock: 'latest',
    })
    console.log(eventDatas)

    for(var eventData of eventDatas)
    {
        console.log('-------------------------------')
        console.log(`from = ${eventData.returnValues.from}`)
        console.log(`to = ${eventData.returnValues.to}`)

        let trans = await web3.eth.getTransaction(eventData.transactionHash)

        // Gas 비용
        console.log(`gas = ${trans.gas}, gasPrice = ${trans.gasPrice}`)
        
        // 전송 비용
        console.log(`value = ${trans.value}`)
    }

    /*
    console.log('-------------------------------')
    for(var eventData of eventDatas)
    {
        let transactionHash = eventData.transactionHash

        let trans = await web3.eth.getTransaction(transactionHash)
        console.log(trans)
    
        //Transfer 기록 확인
        
        // Gas 비용
        console.log(`gas = ${trans.gas}, gasPrice = ${trans.gasPrice}`)
        
        // 발급 계정
        //0x0aadeef83545196ccb2ce70fabf8be1afa3c9b87
        console.log(`from = ${trans.from}`)
        
        // 0xBc1e0507F3A01a7Bf37aD3E2A2E1eAB20f482812 -> contract 주소
        // 
        console.log(`to = ${trans.to}`)
    
        console.log(`value = ${trans.value}`)
    }
    */


    
}

async function main() {

    // main net 접속
    const isSuccess = web3.eth.setProvider(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'))
    if(isSuccess == false) {
        console.log('provider set failed!')
        return
    }

    console.log('privder set success!')

    // main net balance 조회
    const balance = await web3.eth.getBalance('0x449691a090c4b2E43f8589b9f2717D4d7b83eA83')
    console.log(balance + ' wei')

    // ERC721 totalSupply()
    //await readERC732TotalSupply('0x8009250878eD378050eF5D2a48c70E24EB2edE7E')

    // ERC721 meta 정보 조회
    //await readERC721metaData_raw('0x8009250878ed378050ef5d2a48c70e24eb2ede7e', 14971) // 11175
    //await readERC721metaData_raw('0x6d4530149e5b4483d2f7e60449c02570531a0751', 35051)

    //await readERC721metaData_abi('0x8009250878ed378050ef5d2a48c70e24eb2ede7e', 11175)
    //await readERC721Transaction_abi('0x8009250878ed378050ef5d2a48c70e24eb2ede7e', 11175)
    
    //await readERC721metaData_abi('0xBc1e0507F3A01a7Bf37aD3E2A2E1eAB20f482812', 29)
    //await readERC721Transaction_abi('0xBc1e0507F3A01a7Bf37aD3E2A2E1eAB20f482812', 29)
    
    await readERC721metaData_abi('0xBc1e0507F3A01a7Bf37aD3E2A2E1eAB20f482812', 11)
    await readERC721Transaction_abi('0xBc1e0507F3A01a7Bf37aD3E2A2E1eAB20f482812', 11)

    await readERC721metaData_abi('0x66018A2AC8F28f4d68d1F018680957F2F22528Da', 146)

    //await readERC721metaData_abi('0x6d4530149e5b4483d2f7e60449c02570531a0751', 35051)

    //ipfs://*
    // -> https://ipfs.io/ipfs
}


main().then(() => process.exit(0))
