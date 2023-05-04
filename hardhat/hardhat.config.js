require("@nomicfoundation/hardhat-toolbox");
require("solidity-coverage");

/** @type import('hardhat/config').HardhatUserConfig */

//setting up the hardhat network to use the local network
module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    localhost: {
      url: "HTTP://127.0.0.1:7545",
      privateKey: "a93e56c63dc65a137809c7d8c2e12e2eae62fe43d99be3c20a1224b579101c29"
    }
  },

}
