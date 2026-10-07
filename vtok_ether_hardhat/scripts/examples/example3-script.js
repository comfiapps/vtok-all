const hre = require('hardhat')

async function todos_hre() {

    const Todos = await hre.ethers.getContractFactory('Todos')
    const todos = await Todos.deploy()

    await todos.deployed()

    var tx = await todos.create('test todo 1')
    await tx.wait()

    tx = await todos.update(0, 'change todo title')
    await tx.wait()

    var todo = await todos.get(0)
    console.log('text = ' + todo.text)
    console.log('completed = ' + todo.completed)

    // out of bounds
    try {
        todo = await todos.get(1)
    }
    catch(e) {
        console.log('[exception]' + e)
    }
}

async function dataLocations_hre() {

    const [_, somthing] = await hre.ethers.getSigners()

    const DataLocations = await hre.ethers.getContractFactory('DataLocations')
    const dataLocations = await DataLocations.deploy()

    await dataLocations.deployed()

    await dataLocations.f(somthing.address)

    await dataLocations.g()
}

async function function_hre() {

    const Function = await hre.ethers.getContractFactory('Function')
    const funcContract = await Function.deploy()

    await funcContract.deployed()

    var ret = await funcContract.destructAssigments()
    console.log(ret)
}

async function functionModifier_hre() {
    var [owner, second] = await hre.ethers.getSigners()

    const FunctionModifier = await hre.ethers.getContractFactory('FunctionModifer')
    const functionModifier = await FunctionModifier.deploy()

    await functionModifier.deployed()

    await functionModifier.changeOwner(second.address)

    var tx = await functionModifier.decrement(1)
    await tx.wait()

    // require 발생
    tx = await functionModifier.decrement(3)
    await tx.wait()
}

async function main_hre() {

    await hre.run('compile')

    //await todos_hre()
    //await dataLocations_hre()

    //await function_hre()
    await functionModifier_hre()
}

main_hre()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })