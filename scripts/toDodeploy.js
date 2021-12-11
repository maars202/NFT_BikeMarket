

const hre = require("hardhat");
async function main() {
    // We get the contract to deploy
    const Greeter = await hre.ethers.getContractFactory("TodoList");
    const greeter = await Greeter.deploy();
  
    console.log("ToDo deployed to:", greeter.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });