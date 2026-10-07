const hre = require('hardhat')
const { ethers, artifacts } = require('hardhat')

async function deployContract() {

    // artifacts에서 가져온다.
    const SimpleStorage = await ethers.getContractFactory('SimpleStorage')
    const simpleStorage = await SimpleStorage.deploy()

    // contract 배포 estimateGas(추정 gas)
    const deployTransaction = SimpleStorage.getDeployTransaction()
    let estimategas = ethers.provider.estimateGas(deployTransaction)
    console.log(`estimateGas = ${(await estimategas).toNumber()}`)

    // contract 호출 함수별 estimateGas
    let contractFunc = await simpleStorage.estimateGas['set']
    let funcEsimateGas = await contractFunc(100)
    console.log(`func set estimateGas = ${funcEsimateGas.toNumber()}`)

    // sendTransaction 과정
    const deployedContract = await simpleStorage.deployed()
    console.log(deployedContract)

    let number = await simpleStorage.get()
    console.log(`number = ${number}`)


    let tx = await simpleStorage.set(100)
    // sendTransaction 과정
    let receipt = await tx.wait()

    console.log(receipt)

    number = await simpleStorage.get()
    console.log(`number = ${number}`)
}

async function useConract() {
    // deployed Contract
    // 0x610178dA211FEF7D417bC0e6FeD39F05609AD788

    const [owner] = await ethers.getSigners()

    const SimpleStorage = await hre.artifacts.readArtifact('SimpleStorage')

    let simpleStorage = new ethers.Contract('0x610178dA211FEF7D417bC0e6FeD39F05609AD788', SimpleStorage.abi, owner)

    let number = await simpleStorage.get()
    console.log(`number = ${number}`)
}

async function main() {
    hre.ethers.provider = new hre.ethers.providers.WebSocketProvider('ws://127.0.0.1:8545')

    //await deployContract()

    await useConract()

}

main().then(() => process.exit(0))