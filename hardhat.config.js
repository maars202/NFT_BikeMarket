// require("@nomiclabs/hardhat-waffle");

// // This is a sample Hardhat task. To learn how to create your own go to
// // https://hardhat.org/guides/create-task.html
// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

// // You need to export an object to set up your config
// // Go to https://hardhat.org/config/ to learn more

// /**
//  * @type import('hardhat/config').HardhatUserConfig
//  */
// module.exports = {
//   solidity: "0.8.4",
// };

/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
// const { API_URL, PRIVATE_KEY } = process.env;
PRIVATE_KEY = "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
// console.log("PRIVATE_KEY: ", PRIVATE_KEY)
// console.log("API_URL: ", API_URL)
module.exports = {
   solidity: "0.8.0",
   defaultNetwork: "hardhat",
   networks: {
      hardhat: {},
      ropsten: {
         url: "https://ropsten.infura.io/v3/1deb3420665347c1962d707496b09284",
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
