const { web3 } = require('hardhat')
const hre = require('hardhat')

async function event_hre() {
    const Event = await hre.ethers.getContractFactory('Event')
    const event = await Event.deploy()

    await event.deployed()

    // event 등록
    event.on('Log', async (_address, _message) => {
        console.log(_address, _message)
    })

    event.on('AnotherLog', async () => {
        console.log('occur anotherLog!!')
    })

    // hardhat 환경에서 emit 이벤트 받는 방법
    var tx = await event.test()
    var receipt = await tx.wait()
    receipt.events?.filter((x) => {
        if(x.event === 'Log') {
            console.log('sender = ' + x.args.sender)
            console.log('message = ' + x.args.message)
        }
        else if(x.event === 'AnotherLog') {
            console.log('receive AnotherLog')
        }
    })
}

async function inhreitance2_callContract(contractName) {

    const Contract = await hre.ethers.getContractFactory(contractName)
    const contract = await Contract.deploy()
    await contract.deployed()

    var result_value = await contract.foo()
    console.log(contractName + 'result = ' + result_value)
}

async function inheritance1_hre() {

    await inhreitance2_callContract('A')
    await inhreitance2_callContract('B')
    await inhreitance2_callContract('C')
    await inhreitance2_callContract('D')
    await inhreitance2_callContract('E')
    await inhreitance2_callContract('F')

}

async function inhreitance2_hre() {

    const Child = await hre.ethers.getContractFactory('Child')
    const child = await Child.deploy()

    await child.deployed()


    var name = await child.getName()
    console.log(name)
}

async function inheritance_callContract(contractName){

    const Contract = await hre.ethers.getContractFactory(contractName)
    const contract = await Contract.deploy()

    await contract.deployed()

    var tx = await contract.foo()
    var receipt = await tx.wait()

    receipt.events?.filter((x) => {

        if(x.event === 'Log') {
            console.log(contractName + ' : ' + x.args.message)
        }
    })

    tx = await contract.bar()
    receipt = await tx.wait()

    receipt.events?.filter((x) => {

        if(x.event === 'Log') {
            console.log(contractName + ' : ' + x.args.message)
        }
    })

}

async function inhreitance3_hre() {

    await inheritance_callContract('Child_B')
    await inheritance_callContract('Child_C')
    await inheritance_callContract('Child_D')

}

async function main() {
    await hre.run('compile')

    //await event_hre()
    //await inheritance1_hre()
    //await inhreitance2_hre()
    await inhreitance3_hre()
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })