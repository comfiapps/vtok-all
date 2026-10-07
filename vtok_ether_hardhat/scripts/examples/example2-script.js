const hre = require('hardhat')

async function mapping_hre() {
    const [addr1, addr2, addr3] = await hre.ethers.getSigners()
    
    const Mapping = await hre.ethers.getContractFactory('Mapping')
    const mapping = await Mapping.deploy()
   
    await mapping.deployed()

    var tx = await mapping.set(addr1.address, 100)
    await tx.wait()

    var value = await mapping.get(addr1.address)
    console.log(value.toNumber())

    value = await mapping.get(addr2.address)
    console.log(value.toNumber())

    var tx = await mapping.remove(addr1.address)
    await tx.wait()

    var value = await mapping.get(addr1.address)
    console.log(value.toNumber())

    const NestedMapping = await hre.ethers.getContractFactory('NestedMapping')
    const nestedMapping = await NestedMapping.deploy()

    await nestedMapping.deployed()

    value = await nestedMapping.get(addr1.address, 10)
    console.log(value)

    tx = await nestedMapping.set(addr1.address, 10, true)
    await tx.wait()

    value = await nestedMapping.get(addr1.address, 10)
    console.log(value)
}

async function array1_hre() {
    const Array = await hre.ethers.getContractFactory('Array')
    const array = await Array.deploy()

    await array.deployed()

    var tx = await array.push(10)
    await tx.wait()

    var length = await array.getLength()
    console.log('length = ', length.toNumber())

    tx = await array.pop()
    await tx.wait()

    var tx = await array.push(3)
    await tx.wait()

    tx = await array.remove(0)
    await tx.wait()

    length = await array.getLength()
    console.log('length = ', length.toNumber())

    length = await array.examples()
    console.log('length = ', length.toNumber())
}


async function array2_hre() {

    const Array2 = await hre.ethers.getContractFactory('ArrayRemovebyShifting')
    const array2 = await Array2.deploy()

    await array2.deployed()
    await array2.test()

    const Array3 = await hre.ethers.getContractFactory('ArrayReplaceFromEnd')
    const array3 = await Array3.deploy()

    await array3.deployed()
    await array3.test()
}

async function enum_hre() {
    const Enum = await hre.ethers.getContractFactory('Enum')
    const enumContract = await Enum.deploy()

    await enumContract.deployed()

    var enum_value = await enumContract.get()
    console.log(enum_value)

    var tx = await enumContract.set(2)
    await tx.wait()

    enum_value = await enumContract.get()
    console.log(enum_value)


}

async function main_hre() {
    await hre.run('compile')

    //await mapping_hre()
    //await array1_hre()

    //await array2_hre()
    await enum_hre()
}

main_hre()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })