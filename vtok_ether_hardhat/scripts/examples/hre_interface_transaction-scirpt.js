const hre = require('hardhat')
const { web3, ethers } = require('hardhat')

async function main() {
    
    const [addr_1, addr_2] = await hre.ethers.getSigners()
    
    const receipt = await addr_1.sendTransaction({
        from: addr_1.address,
        to: addr_2.address,
        value: ethers.utils.parseEther('1'),
        gasPrice: ethers.utils.parseEther('0.0000001'),
    })

    console.log(receipt)

    let addr_1_bal = await addr_1.getBalance()
    console.log(`addr1 balance = ${addr_1_bal}`)
    
    let addr_2_bal = await addr_2.getBalance()
    console.log(`addr2 balance = ${addr_2_bal}`)

}

main().then(()=>process.exit(0))