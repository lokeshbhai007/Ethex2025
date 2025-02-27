require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

if (!process.env.ALCHEMY_API_URL || !process.env.PRIVATE_KEY) {
  throw new Error("Missing environment variables: Check your .env file.");
}

module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.28" }, // ✅ Added support for Solidity 0.8.28
      { version: "0.8.20" }, // ✅ Keeping existing support for 0.8.20
    ],
  },
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_API_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
