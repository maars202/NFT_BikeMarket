const hre = require("hardhat");
async function main() {
    // We get the contract to deploy
    const marketcontract = await hre.ethers.getContractFactory("NFTMarket");
    const marketdeploy = await marketcontract.deploy();
  
    console.log("Market deployed to:", marketdeploy.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });