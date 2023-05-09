require("@nomicfoundation/hardhat-toolbox");

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
      privateKey: ""
    }
  },

}
