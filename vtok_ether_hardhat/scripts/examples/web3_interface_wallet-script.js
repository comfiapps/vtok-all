const { web3, Web3 } = require('hardhat')

// wallet 생성 (메모리 상에만 존재 상태)
async function createWallet() {

    let wallet = web3.eth.accounts.wallet.create(0, '1111')
    console.log(wallet)

    let address_1 = web3.eth.accounts.create('2222')
    wallet.add(address_1)

    let address_2 = web3.eth.accounts.create('3333')
    wallet.add(address_2)
    
    console.log(wallet)
}


// wallet 생성 및 
async function walletCrypt() {

    let wallet = web3.eth.accounts.wallet.create(0, '1111')

    let address_1 = web3.eth.accounts.create('2222')
    wallet.add(address_1)

    let address_2 = web3.eth.accounts.create('3333')
    wallet.add(address_2)

    console.log(wallet)

    let encrypt = wallet.encrypt('1212')
    console.log(encrypt)

    let decryptWallet = web3.eth.accounts.wallet.decrypt(encrypt, '1212')
    console.log(decryptWallet)


}

async function walletSaveLoad() {
    // !주의!
    // 브라우저 전용
    // 지갑 저장 
    let wallet = web3.eth.accounts.wallet.create(0, '1111')
    console.log(wallet)

    let address_1 = web3.eth.accounts.create('2222')
    wallet.add(address_1)

    let address_2 = web3.eth.accounts.create('3333')
    wallet.add(address_2)

    wallet.save('저장 비밀번호')

    let loadedWallet = web3.eth.accounts.wallet.load('저장했던 비밀번호')
}

async function main() {
    //await createWallet()

    await walletCrypt()
}

main().then(() => process.exit(0))