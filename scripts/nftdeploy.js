

const hre = require("hardhat");
// const addresses = require("../src/contractconfig");
<<<<<<< HEAD
const marketaddressdeployed = "0xc5a5C42992dECbae36851359345FE25997F5C42d"
=======
const marketaddressdeployed = "0xdf970A37CE47a8DE34b176ba5941De31948e8100"
>>>>>>> a2f14d2b746258a2456219e191e767afeeaef639
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