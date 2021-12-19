

const hre = require("hardhat");
// const addresses = require("../src/contractconfig");
const marketaddressdeployed = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
async function main() {
    // We get the contract to deploy
    const NFTContract = await hre.ethers.getContractFactory("NFT");
    const nftdeploy = await NFTContract.deploy(marketaddressdeployed);
    // console.log("market address used:", addresses.NFT_MARKET_ADDRESS)
  
    console.log("NFT address deployed to:", nftdeploy.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });