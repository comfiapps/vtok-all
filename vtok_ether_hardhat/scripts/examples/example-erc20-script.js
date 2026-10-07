const { web3, ethers, Web3 } = require('hardhat')
const hre = require('hardhat')

const Tx = require('ethereumjs-tx')

// ethers 사용
async function transferInitEth() {

    const [owner] = await hre.ethers.getSigners()

    let tx = await owner.sendTransaction({
        from: owner.address,
        to: '0x143ad27c4C636D1f659eFDe34c67E72714E7b4ee',
        value: hre.ethers.utils.parseEther('100'),
    })

    let receipt = await tx.wait()
    console.log(receipt)
}

// ethers 사용
async function depolyErc20(amount) {
    const [owner] = await hre.ethers.getSigners()

    if(typeof(amount) === 'string') {
        amount = ethers.utils.parseUnits(amount)
    }

    const ExampleVtoken1 = await hre.ethers.getContractFactory('ExampleVtoken1')
    const exampleVtoken1 = await ExampleVtoken1.deploy(amount)

    await exampleVtoken1.deployed()

    console.log(`deployed contract address = ${exampleVtoken1.address}`)

    const totalSupply = await exampleVtoken1.totalSupply()
    console.log(`totalSupply = ${totalSupply}`)

    return exampleVtoken1.address
}

// ethers 사용
async function transferErc20(transferAmount, transferAddress, conractAddress) {

    const [owner] = await ethers.getSigners()

    const ExampleVtoken1 = await hre.artifacts.readArtifact('ExampleVtoken1')

    let exampleVtoken1 = new hre.ethers.Contract(conractAddress, ExampleVtoken1.abi, owner)
    
    if(typeof(transferAmount) === 'string') {
        transferAmount = ethers.utils.parseUnits(transferAmount)
    }

    let tx = await exampleVtoken1.transfer(transferAddress, transferAmount)
    await tx.wait()

    let amount = await exampleVtoken1.balanceOf(transferAddress)
    console.log(`${transferAddress} balance : ${amount.toString()}`)
}

// web3 사용 (SignTransaction 필요)
async function ApproveErc20(conractAddress, fromPrivateKey, to, amount) {

    const ExampleVtoken1 = await hre.artifacts.readArtifact('ExampleVtoken1')

    const fromAccount = web3.eth.accounts.privateKeyToAccount(fromPrivateKey)

    const exampleVtoken1 = new web3.eth.Contract(ExampleVtoken1.abi, conractAddress)

    let extraData = await exampleVtoken1.methods.increaseAllowance(
        to,
        web3.utils.toWei(amount, 'ether')
    )

    let nonce = await web3.eth.getTransactionCount(fromAccount.address)

    let txObject = {
        nonce: nonce,
        from: fromAccount.address,
        to: conractAddress,
        data: extraData.encodeABI(),
        gas: 210000,
        gasPrice: web3.utils.toWei('1', 'gwei')
    }

    let signedTransaction = await fromAccount.signTransaction(txObject)
    let receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
    console.log(receipt)
}

// ethers 사용
async function TransferFromErc20(conractAddress, from, to, amount) {

    const ExampleVtoken1 = await hre.artifacts.readArtifact('ExampleVtoken1')

    const [owner] = await hre.ethers.getSigners()

    const exampleVtoken1 = new hre.ethers.Contract(conractAddress, ExampleVtoken1.abi, owner)

    amount = ethers.utils.parseUnits(amount, 'ether')

    console.log(`transfer Amount = ${amount.toString()}`)

    let tx = await exampleVtoken1.transferFrom(from, to, amount)
    await tx.wait()

}

// ethers 사용
async function AllowanceErc20(contractAddress, owner_addr, spener_addr) {
    const [owner] = await ethers.getSigners()

    const ExampleVtoken1 = await hre.artifacts.readArtifact('ExampleVtoken1')

    const exampleVtoken1 = new hre.ethers.Contract(contractAddress, ExampleVtoken1.abi, owner)

    let value = await exampleVtoken1.allowance(owner_addr, spener_addr)
    console.log(`Allowance value = ${value.toString()}`)

}

async function main() {
    await hre.run('compile')

    const [owner] = await hre.ethers.getSigners()

    let tokenAddr

    hre.ethers.provider = new hre.ethers.providers.WebSocketProvider('ws://127.0.0.1:8545')
    web3.setProvider(new Web3.providers.WebsocketProvider('ws://127.0.0.1:8545'))

    // 기본 Eth 전송
    //await transferInitEth('0x4A679253410272dd5232B3Ff7cF5dbB88f295319')

    // ExampleVtoken1 컨트랙트 배포
    //tokenAddr = await depolyErc20('1')
    if (tokenAddr === undefined) {
        tokenAddr = '0x67d269191c92Caf3cD7723F116c85e6E9bf55933'
    }

    // 단순 토큰 Transfer
    //await transferErc20('0.001', '0x143ad27c4C636D1f659eFDe34c67E72714E7b4ee', tokenAddr)

    // vtok account 1
    //0x143ad27c4C636D1f659eFDe34c67E72714E7b4ee
    //privateKey : 0xbbf662fc17f139334ecdc4f933b3368ff00bee8e9a62f0bce8e6492630954d5d

    // vtok account 2
    //0xE8aF15440dcF2423C25e808c28598Dd596009AE1
    //privateKEt : 0x1dbe6fa352ce8871d7d93fd116121d7c064e507c047892fa0b1af5c11be3fb3b
    
    // addr1이 특정 계정에게 토큰 전송 권한을 줌 (amount양 만큼)
    // Approve : addr1 -> owner
    await ApproveErc20(tokenAddr,
                            '0xbbf662fc17f139334ecdc4f933b3368ff00bee8e9a62f0bce8e6492630954d5d', 
                            owner.address,
                            '0.0005')
    
    // addr1이 특정 계정에게 얼마만큼 토큰 전송 권한을 줬는지 확인
    // addr1 -> owner 의 Allowanace 토큰 갯수 확인
    await AllowanceErc20(tokenAddr, '0x143ad27c4C636D1f659eFDe34c67E72714E7b4ee', owner.address)

    // msg.sender = 특정 계정
    // 특정 계정이 from -> sender로 받은 권한 토큰 수량안에서 토큰을 전송해 줌..
    // Owner가 from -> sender로 토큰 전송
    await TransferFromErc20(tokenAddr, 
                            '0x143ad27c4C636D1f659eFDe34c67E72714E7b4ee',
                            '0xE8aF15440dcF2423C25e808c28598Dd596009AE1',
                            '0.0004')
    
}

main().then(() => process.exit(0))