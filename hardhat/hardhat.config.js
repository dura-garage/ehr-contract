require("@nomicfoundation/hardhat-toolbox");
require("solidity-coverage");
require("solidity-docgen");


/** @type import('hardhat/config').HardhatUserConfig */

//setting up the hardhat network to use the local network
module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "localhost",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    localhost: {
      url: "HTTP://127.0.0.1:7545",
      privateKey: "6bf80240f0ec7159c6de76ac6a4036a296c8ad8e83b46b122d7c4e15687073f4"
    }
  },
  docgen: {
    path: './docs',
    clear: true,
    runOnCompile: true,
  },

}
