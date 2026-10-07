const hre = require('hardhat')

async function varialbes_hre() {

    const Variables = await hre.ethers.getContractFactory('Variables')
    const varialbes = await Variables.deploy()

    await varialbes.deployed()

    var const_value = await varialbes.MY_CONST_VALUE()
    console.log(const_value.toNumber())

    var text = await varialbes.text()
    console.log(text)

    var num = await varialbes.num()
    console.log(num.toNumber())
}

async function immutable_hre() {

    const [owner] = await hre.ethers.getSigners()
    console.log('owner = ', owner.address)

    const Immutable = await hre.ethers.getContractFactory('Immutable')
    const immutable = await Immutable.deploy(849374)

    await immutable.deployed()

    var myAddress = await immutable.MY_ADDRESS()
    var myUnit = await immutable.MY_UNIT()

    console.log('contract owner =', myAddress) // string
    console.log(myUnit.toNumber())
}

async function simpleStorage_hre() {

    const SimpleStorage = await hre.ethers.getContractFactory('SimpleStorage')
    const simpleStorage = await SimpleStorage.deploy()

    await simpleStorage.deployed()
    
    var tx = await simpleStorage.set(2543)
    await tx.wait()

    var num = await simpleStorage.get()
    console.log(num.toNumber())
}

async function ehterUnit_hre() {

    const EtherUnits = await hre.ethers.getContractFactory('EtherUnits')
    const etherUnits = await EtherUnits.deploy()

    await etherUnits.deployed()
}

async function ifelse_hre() {
    const IfElse = await hre.ethers.getContractFactory('IfElse')
    const ifElse = await IfElse.deploy()

    await ifElse.deployed()

    var value = await ifElse.foo(21)
    console.log(value.toNumber())

    value = await ifElse.ternary(3)
    console.log(value.toNumber())
}

async function loop_hre() {
    const Loop = await hre.ethers.getContractFactory('Loop')
    const loop = await Loop.deploy()

    await loop.deployed()

    await loop.loop()
}


async function main_hre() {

    await hre.run('compile')

    //await varialbes_hre()
    //await immutable_hre()

    await simpleStorage_hre()
    //await ehterUnit_hre()
    //await ifelse_hre()

    //await loop_hre()
}

main_hre()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })