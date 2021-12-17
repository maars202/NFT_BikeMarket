

const hre = require("hardhat");
// const addresses = require("../src/contractconfig");
const marketaddressdeployed = "0xa78AE620DE73347fA8Fe484Ef2Cce081BB734d23"
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