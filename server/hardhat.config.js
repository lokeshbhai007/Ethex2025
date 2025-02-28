require("dotenv").config({ path: "./.env" });
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

if (!process.env.ALCHEMY_API_URL || !process.env.PRIVATE_KEY) {
  throw new Error("Missing environment variables: Check your .env file.");
}

module.exports = {
  solidity: "0.8.18",
  paths: {
    artifacts: "./artifacts",
    sources: "./contracts",
    cache: "./cache",
    tests: "./test",
  },
};

