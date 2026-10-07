const hre = require('hardhat')
const { ethers } = require('hardhat')

async function erc721Depoly() {

    const ERC721 = await ethers.getContractFactory('ExampleVtokErc721')
    const erc721 = await ERC721.deploy()

    const contract = await erc721.deployed()

    console.log(`erc721 contract address = ${contract.address}`)
}

async function erc721Award(contractAddr, receiver) {
    //https://dl.dropbox.com/s/hh3klud31tpjm5p/example-meta-1.json

    const [owner] = await hre.ethers.getSigners()

    const ERC721 = await hre.artifacts.readArtifact('ExampleVtokErc721')
    const erc721 = new hre.ethers.Contract(contractAddr, ERC721.abi, owner)

    let tx = await erc721.awardItem(receiver, 'https://dl.dropbox.com/s/hh3klud31tpjm5p/example-meta-1.json')
    await tx.wait()
}

async function erc721Confirm(conractAddr) {
    const [owner] = await hre.ethers.getSigners()

    const ERC721 = await hre.artifacts.readArtifact('ExampleVtokErc721')
    const erc721 = new hre.ethers.Contract(conractAddr, ERC721.abi, owner)

    let tokenUri = await erc721.tokenURI(1)

    console.log(`uri = ${tokenUri}`)
}

async function main() {

    await hre.run('compile')

    ethers.provider = new ethers.providers.WebSocketProvider('ws://127.0.0.1:8545')

    //await erc721Depoly()

    //deployed contract = 0x5FbDB2315678afecb367f032d93F642f64180aa3
    
    //await erc721Award('0x5FbDB2315678afecb367f032d93F642f64180aa3', '0x70997970c51812dc3a010c7d01b50e0d17dc79c8')

    //await erc721Confirm('0x5FbDB2315678afecb367f032d93F642f64180aa3')


}

main().then(() => process.exit(0))