

const hre = require("hardhat");
// const addresses = require("../src/contractconfig");
const marketaddressdeployed = "0x62b23C0da10852399c49a35600C6E569CC2D9512"
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