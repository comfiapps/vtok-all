require('@nomiclabs/hardhat-waffle')
require('@nomiclabs/hardhat-ethers')
require('@nomiclabs/hardhat-web3')
require('ethereumjs-tx')

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  version: "0.20.1",
  // default value is 'hardhat'1
  defaultNetwork: 'hardhat',
  networks: {
    /*
    localhost: {
      url: 'http://127.0.0.1:8546'
    },
    */
    hardhat: {
      // chainId (default :31337)
      //chainId: 31337,
      // 마이닝 모드 (이 부분을 설정해야 MetaMask 테스트 가능?)
      mining: {
        auto: false,
        interval: 1000,
      },
    },
    //rinkeby 설정도 가능 # https://hardhat.org/config/
    /*
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/123abc123abc123abc123abc123abcde',
      accounts: [privateKey1, privateKey2, ...]
    }
    */
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
  solidity: '0.8.4',
}
