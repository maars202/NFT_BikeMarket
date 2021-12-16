const { expect } = require("chai");
const { ethers, network } = require("hardhat");

describe.skip("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();
    console.log("greeter deployed to:", greeter.address)

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});



describe.skip("ToDoList", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("TodoList");
    const greeter = await Greeter.deploy();
    await greeter.deployed();
    console.log("todo deployed to:", greeter.address)
    const taskCount = await greeter.taskCount()
    // console.log(taskCount.toNumber())
    // console.log(ethers.BigNumber.from(1))
    expect(taskCount.toNumber()).to.equal(1);
    // expect(final_num.toString()).to.equal(ethers.BigNumber.from(number_tp_store));
  });
});

describe.skip("NFT", function () {
  let nftinstance
  let Owner
  let Alice
  let Bob
  let Caleb
  before( async function( ){
    const [owner, alice, bob, caleb] = await ethers.getSigners();
      // console.log("signers: ", owner)
      Owner = owner
      Alice = alice
      Bob = bob
      Caleb = caleb
      
      const Token = await ethers.getContractFactory("NFT");
      console.log("getting storage contract from artifacts")
      console.log("Caleb address: ", Caleb.address)

      // deployed storage instance:
      
      
      nftinstance = await Token.deploy(Caleb.address);

      // await hardhatToken.deployed()
      console.log("deployed to ", nftinstance.address)


  })
  it("name test", async function(){
    // this.skip()
    // console.log("------conducting first test")
    const name = await nftinstance.name();
    expect(name).to.equal("Metaverse Tokens")


  })
  it("symbol test", async function(){
    // this.skip()
    // console.log("------conducting second test")
    const symbol = await nftinstance.symbol();
    expect(symbol).to.equal("METT")

  })

  it("nft", async function () {
    nftinstance.createToken("dummy")
    const balance_Alice = await nftinstance.balanceOf(Alice.address)
    const balance_owner = await nftinstance.balanceOf(Owner.address)
    expect(balance_Alice.toNumber()).to.equal(0)
    expect(balance_owner.toNumber()).to.equal(1)
  });


  it("balanceOf test", async function(){
    // must run with 'mint test'
    this.skip() 
    
    const balance_Alice = await dognftinstance.balanceOf(Alice.address)
    const balance_Bob = await dognftinstance.balanceOf(Bob.address)
    // bignumber wouldnt be equal even with same number cuz datastructure unique every time its created similar to objects and arrays in js
    console.log("currentbalance: ", balance_Alice, ethers.BigNumber.from(2))
    expect(balance_Alice.toNumber()).to.equal(1)
    expect(balance_Bob.toNumber()).to.equal(1)
  })

});

/* test/sample-test.js */
describe.skip("NFTMarket", function() {
  let nft
  let market
  let Owner
  let Alice
  let Bob
  let Caleb
  let ListingPrice
  let nftContractAddress
  before( async function() {
    const [owner, alice, bob, caleb] = await ethers.getSigners();
      // console.log("signers: ", owner)
      Owner = owner
      Alice = alice
      Bob = bob
      Caleb = caleb

      /* deploy the marketplace */
      const Market = await ethers.getContractFactory("NFTMarket")
      market = await Market.deploy()
      await market.deployed()
      const marketAddress = market.address
  
      /* deploy the NFT contract */
      const NFT = await ethers.getContractFactory("NFT")
      nft = await NFT.deploy(marketAddress)
      await nft.deployed()
      nftContractAddress = nft.address
  
      
      // ListingPrice = listingPrice
  
})
  
  it("Should create and execute market sales", async function() {

    const auctionPrice = ethers.utils.parseUnits('1', 'ether')

    /* create two tokens */
    await nft.createToken("https://www.mytokenlocation.com")
    await nft.createToken("https://www.mytokenlocation2.com")
    let listingPrice = await market.getListingPrice()
    listingPrice = listingPrice.toString()
    console.log("listingPrice", listingPrice,"auctionPrice",  auctionPrice)
    /* put both tokens for sale */
    await market.createMarketItem(nftContractAddress, 1, auctionPrice, { value: listingPrice })
    await market.createMarketItem(nftContractAddress, 2, auctionPrice, { value: listingPrice })

    const [_, buyerAddress] = await ethers.getSigners()


    /* execute sale of token to another user */
    await market.connect(Alice).createMarketSale(nftContractAddress, 1, { value: auctionPrice})

    /* query for and return the unsold items */
    items = await market.fetchMarketItems()
    console.log("items", items)
    items = await Promise.all(items.map(async i => {
      const tokenUri = await nft.tokenURI(i.tokenId)
      let item = {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenUri
      }
      return item
    }))
    console.log('items: ', items)


    const balance_Alice = await nft.balanceOf(Alice.address)
    const balance_bob = await nft.balanceOf(Bob.address)
    expect(balance_Alice.toNumber()).to.equal(1)
    expect(balance_bob.toNumber()).to.equal(0)

  })

  it("relisting item", async function(){
    let original = await nft.ownerOf(1)
    console.log("original: ", original === Alice.address)
    let listingPrice = await market.getListingPrice()
    listingPrice = listingPrice.toString()
    await market.connect(Alice).relistMarketItem(nftContractAddress, 1, { value: listingPrice})
    // relistMarketItem(
    //   address nftContract,
    //   uint256 itemId,
    // )
    // msg.value == listingPrice
    const balance_Alice = await nft.balanceOf(Alice.address)
    const balance_bob = await nft.balanceOf(Bob.address)
    expect(balance_Alice.toNumber()).to.equal(0)
    expect(balance_bob.toNumber()).to.equal(0)
  })
})


/* test/sample-test.js */
describe("NFTMarket regversion", function () {
  let nft;
  let market;
  let Owner;
  let Alice;
  let Bob;
  let Caleb;
  let listingPrice;
  let auctionPrice;
  let nftContractAddress;
  let marketAddress

  beforeEach(async function () {
    const [owner, alice, bob, caleb] = await ethers.getSigners();
    // console.log("signers: ", owner)
    Owner = owner;
    Alice = alice;
    Bob = bob;
    Caleb = caleb;

    /* deploy the marketplace */
    const Market = await ethers.getContractFactory("NFTMarket");
    market = await Market.deploy();
    await market.deployed();
    marketAddress = market.address;

    /* deploy the NFT contract */
    const NFT = await ethers.getContractFactory("NFT");
    nft = await NFT.deploy(marketAddress);
    await nft.deployed();
    nftContractAddress = nft.address;

    auctionPrice = ethers.utils.parseUnits('1', 'ether')

    /* create two tokens */
    await nft.createToken("https://www.mytokenlocation.com")
    await nft.createToken("https://www.mytokenlocation2.com")
    await nft.createToken("https://www.mytokenlocation3.com")
    listingPrice = await market.getListingPrice()
    console.log("listingPrice", listingPrice,"auctionPrice",  auctionPrice)
    /* put both tokens for sale */
    await market.createMarketItem(nftContractAddress, 1, auctionPrice, { value: listingPrice })
    await market.createMarketItem(nftContractAddress, 2, auctionPrice, { value: listingPrice })
    await market.createMarketItem(nftContractAddress, 3, auctionPrice, { value: listingPrice })


    /* execute sale of token to another user */
    await market
      .connect(Alice)
      .createMarketSale(nftContractAddress, 1, { value: auctionPrice });

       // greedy alice buying another token:
    await market
    .connect(Alice)
    .createMarketSale(nftContractAddress, 3, { value: auctionPrice });
});



  it("Should create and execute market sales", async function () {

    const [_, buyerAddress] = await ethers.getSigners();

    /* query for and return the unsold items */
    items = await market.fetchMarketItems();
    console.log("items", items);
    items = await Promise.all(
      items.map(async (i) => {
        const tokenUri = await nft.tokenURI(i.tokenId);
        let item = {
          price: i.price.toString(),
          tokenId: i.tokenId.toString(),
          seller: i.seller,
          owner: i.owner,
          tokenUri,
        };
        return item;
      })
    );
    console.log("items: ", items);

    const balance_Alice = await nft.balanceOf(Alice.address);
    const balance_bob = await nft.balanceOf(Bob.address);
    expect(balance_Alice.toNumber()).to.equal(2);
    expect(balance_bob.toNumber()).to.equal(0);
  });

  it("relisting item", async function () {

    console.log("🔥 Alice's address");
    console.log(Alice.address);

    let original = await nft.ownerOf(1);
    let initialAliceBalance = await nft.balanceOf(Alice.address);
    console.log("🔥 original: ", original === Alice.address);
    console.log(Alice.address);

    // let listingPrice = await market.getListingPrice()
    // listingPrice = listingPrice.toString()

    await nft.approveTo(Alice.address, 1)
    // await nft.approveTo(marketAddress, 1)
    let balance2 = await market.connect(Alice).relistMarketItem(nftContractAddress, 1, {
      value: listingPrice,
    });
    console.log("Alice initial balance= ",initialAliceBalance, "final balance: ", balance2 )
    // relistMarketItem(
    //   address nftContract,
    //   uint256 itemId,
    // )
    // msg.value == listingPrice

    // new market items should have tokenId 1 in it now!:
    let current_mkt_items = await market.fetchMarketItems()
    items = await Promise.all(current_mkt_items.map(async i => {
      const tokenUri = await nft.tokenURI(i.tokenId)
      let item = {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenUri
      }
      return item
    }))
    console.log('items: ', items)

    const balance_Alice = await nft.balanceOf(Alice.address);
    const balance_bob = await nft.balanceOf(Bob.address);
    expect(balance_Alice.toNumber()).to.equal(0);
    expect(balance_bob.toNumber()).to.equal(0);
  });
});

 
