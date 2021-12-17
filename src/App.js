import './App.css';
import React, { Component } from 'react'
import Web3 from 'web3'
import { ethers } from 'ethers'
import axios from 'axios'
import NFTnumIcon from "./components/NFTiconsnum"
// import {address, contract_abi} from "./contractconfig"
import { NFT_ADDRESS, NFT_ABI, NFT_MARKET_ADDRESS, NFT_MARKET_ABI
 } from './contractconfig'
import Box from '@mui/material/Box';


import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';



import Card from "./components/Card"
// import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
// import Masonry from '@mui/lab/Masonry';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"


// import { Form, Input, Button as Button2, Radio } from 'antd';
// import { InfoCircleOutlined } from '@ant-design/icons';



// PINATA INFO: 
// const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
// const pinataApiKey = "909b357f4b9fb06f2c30"
// const pinataSecretApiKey = "56f4e5738dbd426702efbe493d4cce53f778482ede18b39440d045fba1b81e9f"
// const jwt_secret = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzN2I5YmU4Mi03YWU1LTQ0ZWYtYWU3NS1jOTA5YTZiZTJhODAiLCJlbWFpbCI6Im1hYXJ1bmlwLjIwMjBAc2Npcy5zbXUuZWR1LnNnIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZX0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjkwOWIzNTdmNGI5ZmIwNmYyYzMwIiwic2NvcGVkS2V5U2VjcmV0IjoiNTZmNGU1NzM4ZGJkNDI2NzAyZWZiZTQ5M2Q0Y2NlNTNmNzc4NDgyZWRlMThiMzk0NDBkMDQ1ZmJhMWI4MWU5ZiIsImlhdCI6MTYzODg2OTM3N30.wAzeQcFJi1b5iyMtgHsSpjjCLv57PWutdDYhG-yn66o"

class App extends Component {
  
  componentWillMount() {
    this.loadBlockchainData()
  }


  async itempromisemapping(data){

    const dataitems = await Promise.all(data.map(async (i) => {
      const tokenUri = await this.state.tokenContract.methods.tokenURI(i.tokenId).call()
      // console.log("rendering tokenid: ", i.tokenId, typeof(i.tokenId))
      // console.log("i: ", i)
      const meta = await axios.get(tokenUri)
      console.log("meta",meta)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        name: meta.data.name, 
        description: meta.data.name, 
        price,
        tokenId: Number(i.tokenId),
        seller: i.seller,
        owner: i.owner,
        sold: i.sold,
        image: meta.data.image,
      }
      return item
    }))
    return dataitems
  }

  async loadBlockchainData() {
    // let web3 = new Web3(Web3.givenProvider || "http://localhost:8545")

        // window web3 detection added:
    const web3 = new Web3(window.web3.currentProvider);


    // let web3
    // console.log("web3 type: ", typeof(web3), JSON.stringify(web3))
    // if(typeof web3 == 'undefined'){
    //   console.log("Using web3 detected from external source like Metamask")
    //    web3 = new Web3(web3.currentProvider)
    //   }else{
    //      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
    //   }

    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({ account: accounts[0] })
    const marketContract = new web3.eth.Contract(NFT_MARKET_ABI, NFT_MARKET_ADDRESS)
    const tokenContract = new web3.eth.Contract(NFT_ABI, NFT_ADDRESS)
    // console.log("first contract: ",marketContract)
    // console.log("second contract: ",tokenContract)
    this.setState({ marketContract })
    this.setState({ tokenContract })

    const data = await marketContract.methods.fetchItemsCreated().call()
    const items = await this.itempromisemapping(data)
    console.log("items collated: ", items)
    /* create a filtered array of items that have been sold */


    const soldItems = items.filter(i => i.sold)
    this.setState({soldItems: soldItems})
    this.setState({items: items})


    const unsoldItems = items.filter(i => !i.sold)
    console.log("unsoldItems: ", unsoldItems)
    this.setState({unsoldItems: unsoldItems})


    console.log("fetchingmynfts for account: ", this.state.account)
    const marketitemsdata = await marketContract.methods.fetchMarketItems().call({from: this.state.account})
    const marketitems = await this.itempromisemapping(marketitemsdata)
    this.setState({marketitems: marketitems})


    console.log("fetchingmynfts for account: ", this.state.account)
    const nftdata = await marketContract.methods.fetchMyNFTs().call({from: this.state.account})
    const mynfts = await this.itempromisemapping(nftdata)
    this.setState({mynfts: mynfts})


    console.log("fetchingmynfts for account: ", this.state.account)
    const creationdata = await marketContract.methods.fetchItemsCreated().call({from: this.state.account})
    const creations = await this.itempromisemapping(creationdata)
    console.log("creations: ", creations)
    this.setState({creations: creations})





    // setSold(soldItems)
    // setNfts(items)
    // setLoadingState('loaded') 


    // this.setState({ taskCount })
    // this.setState({
    //   tasks:[]
    // })
    // for (var i = 1; i <= taskCount; i++) {
    //   const task = await todoList.methods.tasks(i).call()
    //   console.log("task: ",task )
    //   this.setState({
    //     tasks: [...this.state.tasks, task]
    //   })
      
    // }

    this.setState({ loading: false })
    
  }

  constructor(props) {
    super(props)
    this.state = { 
      account: '',
      taskCount: 0,
      tasks: [],
      new_task: '',
      loading: true,
      previewurl: null,
      items: [],
      mynfts: [],
      dialogopen: false,
      unsoldItems: [],
      creations: [],
      marketitems: []

   }

    this.createMarket = this.createMarket.bind(this);
    this.createSale = this.createSale.bind(this);
    this.handleSubmission =  this.handleSubmission.bind(this);
    this.changeHandler =  this.changeHandler.bind(this);
    this.uploadtoipfs =  this.uploadtoipfs.bind(this);

    this.handleClickOpendialog = this.handleClickOpendialog.bind(this)
    this.handleClosedialog = this.handleClosedialog.bind(this)

    this.itempromisemapping = this.itempromisemapping.bind(this)
  }

  // const [open, setOpen] = React.useState(false);

  handleClickOpendialog = () => {
    // setOpen(true);
    this.setState({dialogopen: true})
  };

  handleClosedialog = () => {
    // setOpen(false);
    this.setState({dialogopen: false})
  };


  
	 changeHandler = (event) => {
     console.log("files: ", event.target.files[0])
     console.log("preview url: ", URL.createObjectURL(event.target.files[0]))
     this.setState({previewurl:URL.createObjectURL(event.target.files[0])})
		this.setState({newurl: event.target.files[0]});
    
		// setIsSelected(true);
	};

  async createMarket(e) {
    e.preventDefault();
    const { newname, newdescription, newprice, newurl } = this.state
    if (!newname || !newdescription || !newprice || !newurl){

      alert("please enter valid input")
      return
    } 
    // /* first, upload to IPFS */
    // const data = JSON.stringify({
    //   name, description, image: newurl
    // })
    // try {
    //   const added = await client.add(data)
    //   const url = `https://ipfs.infura.io/ipfs/${added.path}`
    //   /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
    //   this.createSale(url)
    // } catch (error) {
    //   console.log('Error uploading file: ', error)
    // }  
    this.uploadtoipfs()
    
  }

  async uploadtoipfs() {
    alert("Creating your NFT now!")
    this.setState({ loading: true })
    const response_ = await this.handleSubmission()
    console.log("response_", response_)
    if (response_.success) {
      this.setState({ pinataUrl: response_.pinataUrl })
      this.setState({newname: null})
    this.setState({newdescription: null})
    // this.setState({newprice: null})
    this.setState({previewurl: null})
    this.setState({newurl: null})
    await this.createSale(response_.pinataUrl)
    this.loadBlockchainData()
    console.log("successful marketitemcreation n loading loadBlockchainData")
    return
    
    }
    console.log("please try uploading again")
    this.setState({newname: null})
    this.setState({newdescription: null})
    this.setState({newprice: null})
    this.setState({previewurl: null})
    this.setState({newurl: null})
    

    this.setState({ loading: false })
    this.loadBlockchainData()
    return 
 
  }

  async createSale(url) {
    console.log("createSale() with url in progress: ", url)
    
    // const web3Modal = new Web3Modal()
    // const connection = await web3Modal.connect()
    // const provider = new ethers.providers.Web3Provider(connection)    
    // const signer = provider.getSigner()

    /* next, create the item */
    // let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    console.log("tokencontract methods: ", this.state.tokenContract.methods)
    console.log("sending from : ", this.state.account)
    let tx
    // this.state.todoList.methods.createTask(content).send({ from: this.state.account })
    await this.state.tokenContract.methods.createToken(url).send({ from: this.state.account })
    .once('receipt', (receipt) => {
     console.log("token created!: receipt events: ", JSON.stringify(receipt.events))
     tx = receipt.events
     return receipt
});

    let tokenId = tx['Transfer'].returnValues['tokenId']
    console.log("tokenId: ", tokenId)
    console.log(this.state.newprice, typeof(this.state.newprice))
    const preprice=  Number(this.state.newprice)
    console.log("preprice: ", preprice, typeof(preprice))
    const price = ethers.utils.parseUnits(this.state.newprice, 'ether')
    console.log("price bignumber: ", preprice, typeof(preprice), price, typeof(price))
    /* then list the item for sale on the marketplace */
    // contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    let listingPrice = await this.state.marketContract.methods.getListingPrice().call()
    listingPrice = listingPrice.toString()
    console.log("listingprice: ", listingPrice)
    const setprice = ethers.utils.parseUnits(this.state.newprice, 'ether')
    const setprice2 = ethers.utils.parseUnits(listingPrice, 'ether')

    let tx2
    let transaction2 = await this.state.marketContract.methods.createMarketItem(NFT_ADDRESS, tokenId, setprice).send({ from: this.state.account, value: listingPrice })
    .once('receipt', (receipt) => {
      console.log("createMarketItem created!: receipt events: ", JSON.stringify(receipt.events))
      tx2 = receipt.events
      return receipt
 });
    // await transaction.wait()
    console.log("FINAL STEP: ", transaction2)
    // router.push('/')
    return 
  }


  async buyNFT(item){
    console.log(item)
    alert(`buying tokenid: ${item.tokenId}`)
    // let auctionPrice = Number(item.price)
    let auctionPrice1 = (Number(item.price)/ 1000000000000000000).toString()
    let auctionPrice = ethers.utils.parseUnits(String(Number(item.price)), 'ether')
    console.log("price: ", auctionPrice, typeof(auctionPrice))
    let itemid = item.tokenId

    let tx3
    // market.connect(buyerAddress).createMarketSale(nftContractAddress, 1, { value: auctionPrice})
    let transaction3 = await this.state.marketContract.methods.createMarketSale(NFT_ADDRESS, itemid).send({ from: this.state.account, value: auctionPrice })
    .once('receipt', (receipt) => {
      console.log("connect created!: receipt events: ", JSON.stringify(receipt.events))
      tx3 = receipt.events
      return receipt
 });
    
    
    // createMarketSale(NFT_ADDRESS, tokenId, setprice2).send({ from: this.state.account, value: listingPrice })
    this.loadBlockchainData()
  }

  async listonmarket(item){
    alert(`listing ${JSON.stringify(item)} on market now!`)
  }

  
	handleSubmission = async () => {
    console.log("submitting this state : ", this.state)
    // setLoading(true)
    
    const data = new FormData();
    // const jsondata = new FormData();

// formData.append('File', selectedFile);
    data.append('file', this.state.newurl);
    let name_ = this.state.newname
    let description_ = this.state.newdescription
    let price_ = this.state.newprice

    const formdata = [name_,
    description_,
    price_ ]
    console.log("hereeee", formdata)


    //pinataOptions are optional
    const pinataOptions = JSON.stringify({
        cidVersion: 0,
        customPinPolicy: {
            regions: [
                {
                    id: 'FRA1',
                    desiredReplicationCount: 1
                },
                {
                    id: 'NYC1',
                    desiredReplicationCount: 2
                }
            ]
        }
    });
    data.append('pinataOptions', pinataOptions);

    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    const pinataApiKey = "909b357f4b9fb06f2c30"
    const pinataSecretApiKey = "56f4e5738dbd426702efbe493d4cce53f778482ede18b39440d045fba1b81e9f"
    const jwt_secret = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzN2I5YmU4Mi03YWU1LTQ0ZWYtYWU3NS1jOTA5YTZiZTJhODAiLCJlbWFpbCI6Im1hYXJ1bmlwLjIwMjBAc2Npcy5zbXUuZWR1LnNnIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZX0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjkwOWIzNTdmNGI5ZmIwNmYyYzMwIiwic2NvcGVkS2V5U2VjcmV0IjoiNTZmNGU1NzM4ZGJkNDI2NzAyZWZiZTQ5M2Q0Y2NlNTNmNzc4NDgyZWRlMThiMzk0NDBkMDQ1ZmJhMWI4MWU5ZiIsImlhdCI6MTYzODg2OTM3N30.wAzeQcFJi1b5iyMtgHsSpjjCLv57PWutdDYhG-yn66o"
    return axios
    .post(url, data, {
        maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
        headers: {
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey
        }
    })
    .then(function (response) {
        //handle response here

        console.log("successful response: ", JSON.stringify(response.data))

        console.log("hereeee", formdata)
        // JSON UPLOADING 
        const jsonbody = {
          name: formdata[0],
                description: formdata[1], 
                price: formdata[2],
                image: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
           
        }
        const sendingJSON = {
            pinataContent: jsonbody
        }

        const jsonurl = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
        return axios
            .post(jsonurl, sendingJSON, {
                maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
                headers: {
                    // 'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                    pinata_api_key: pinataApiKey,
                    pinata_secret_api_key: pinataSecretApiKey
                }
            })
            .then(async (response) => {
                console.log("successful response JSON: ", JSON.stringify(response.data))
                // setIsUploadSuccess(true)
                // setLoading(false)
                // this.setState({ loading: false })
                // await mintNFT("https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash)
                // setIPFS({...ipfs, IPFS_json: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash})
                return {
                    success: true,
                    pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
                };
            }).catch(error => {
                console.log("Errorrr JSON: ", error)
                // setLoading(false)
                // this.setState({ loading: false })
                return {
                    success: false,
                    message: error.message,
                };
            })
    })
    .catch(function (error) {
        //handle error 
        console.log("Errorrr: ", error)
        // this.setState({ loading: false })
        // setIsUploadSuccess(false)
    });
};



  render() {
    return (
      <div style={styles.biggerContainer}>
      <div className="container" style={styles.container}>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={this.state.loading}
        // onClick={handleClose}
      >
         <CircularProgress color="inherit" />
      </Backdrop>
        <h1>Hello, {this.state.account}!</h1>
        <div style={{display: "flex", justifyContent: "left", alignItems: "center"}}>
         <NFTnumIcon nftcount={this.state.marketitems.length}/><p>NFTs posted on market:</p>
        
        </div>
        
        <Box sx={{ minHeight: 393 }}>
        <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
            >
        <Masonry columns={3} spacing={1}>
        {this.state.marketitems.map((item, index) => {
          if (!item.sold){
        return(
          <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          <Card key={index} url={item.image} item={{idx: index, ...item}}/>
          <div style={{marginHorizontal: "20px", alignItems: "center"}}>
          <Button  variant="contained" color="success" onClick={() => {
            console.log(item.tokenId)
            this.buyNFT(item)
          }}>
        BUY ME!
      </Button>
      </div>
          </div>
          
        )
        }
        })}
      </Masonry>
      </ResponsiveMasonry>
      </Box>
      <div style={{display: "flex", justifyContent: "left", alignItems: "center"}}>
         <NFTnumIcon nftcount={this.state.mynfts.length}/><p>My NFTS:</p>
        
        </div>

      <Box sx={{ minHeight: 393 }}>
      <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
            >
        <Masonry columns={4} spacing={1}>
        {this.state.mynfts.map((item, index) => {
        return(
          <div style={{diplay: "flex", flexDirection: "column"}}>
          <Card key={index} url={item.image} item={{idx: index, ...item}}/>
          <div style={{marginHorizontal: "",justifyContent: "center" ,alignItems: "center", display: "flex", flexDirection: "row"}}>
          <Button  style={{margin: "10px"}} variant="contained" color="success" onClick={() => {
            console.log(item.tokenId)
            this.buyNFT(item)
          }}>
        BUY ME!
      </Button>
      
      <Button  variant="contained" color="info" onClick={() => {
            console.log(item.tokenId)
            this.listonmarket(item)
          }}>
        Sell
      </Button>
      </div>
          </div>
          
        )})}
      </Masonry>
      </ResponsiveMasonry>
      </Box>


      <div style={{display: "flex", justifyContent: "left", alignItems: "center"}}>
         <NFTnumIcon nftcount={this.state.creations.length}/><p>My Creations:</p>
        
        </div>

      <Box sx={{ minHeight: 393}}>
      <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
            >
        <Masonry columns={5} spacing={1}>
        {this.state.creations.map((item, index) => {
          // if (!item.sold){
        return(
          <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          <Card key={index} url={item.image} item={{idx: index, ...item}}/>
          <div style={{marginHorizontal: "20px", alignItems: "center"}}>
          
      </div>
          </div>
          
        )

        })}
      </Masonry>
      </ResponsiveMasonry>
      </Box>



  

        <div>
      <form onSubmit={this.createMarket} style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
        <label style={{marginBottom: "10px"}}>
            Select Image:
            <input type="file" name="file" onChange={
              this.changeHandler} />
          </label>
      
        <label style={{marginBottom: "10px"}}>
          Name:
          <input type="text" onChange={e => this.setState({newname: e.target.value })} />
        </label>
        <label style={{marginBottom: "10px"}}>
          Description:
          <input type="text" onChange={e => this.setState({newdescription: e.target.value })} />
        </label>

        <label style={{marginBottom: "10px"}}>
          Price:
          <input type="number" min="0" step="0.00001" onChange={e => this.setState({newprice: e.target.value })} />
        </label>
        <input style={{width: 200}} type="submit" value="Submit" />
      </form>
      </div>


      <div>

        <div>


    <h3>name: {this.state.newname} </h3>
    <h3>description: {this.state.newdescription}</h3>
    {/* newimage: {this.state.newurl.toString()} */}
    <h3>price: {this.state.newprice}</h3>
    </div>
    <div>

          { this.state.previewurl != null ? 
          (<div style={{maxHeight: "100"}}>
            <Card url={this.state.previewurl} item={{idx: 1}}/> 
          </div>) : 
          <div>No image selected</div>
          }
        
        </div>
      </div>
      
      </div>
      </div>
    );
  }
}


export default App;


const styles={
  biggerContainer: {
 backgroundImage: "url(" + "data:image/jpeg;base64,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" + ")",
    backgroundSize: 'cover',
            overflow: 'hidden',
  },
  container: {
    margin: "50px",
    color: "white", 
    // backgroundColor: "grey",
    // backgroundImage: "url(" + "data:image/jpeg;base64,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" + ")",
    // backgroundSize: 'cover',
    //         overflow: 'hidden',
    color: "black",
    // background: "linear-gradient(#3494E6, #EC6EAD);" 

}}
