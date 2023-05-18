require("@nomicfoundation/hardhat-toolbox");
require("solidity-coverage");
require("solidity-docgen");
require("dotenv").config();


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
      url: process.env.LOCAL_URL,
      privateKey: process.env.LOCAL_PRIVATE_KEY,
    }
  },
  docgen: {
    path: './docs',
    clear: true,
    runOnCompile: true,
  },

}
