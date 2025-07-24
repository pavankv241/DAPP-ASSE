require("@nomicfoundation/hardhat-toolbox");
//require("dotenv").config(); // Add dotenv support

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: "Sepolia URL",
      accounts: ["Sepolia Private key"]
    }
  }
};
