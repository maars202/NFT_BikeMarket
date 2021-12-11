import logo from './logo.svg';
import './App.css';
import React, { Component, useState } from 'react'
import Web3 from 'web3'
import { ethers } from 'ethers'
import axios from 'axios'
import Contract from "./components/basic"
import FileUploader from './components/fileuploader';
import NFTnumIcon from "./components/NFTiconsnum"
// import {address, contract_abi} from "./contractconfig"
import { NFT_ADDRESS, NFT_ABI, NFT_MARKET_ADDRESS, NFT_MARKET_ABI, TODO_LIST_ADDRESS, TODO_LIST_ABI
 } from './contractconfig'
// function App() {
//   return (
//     <div className="App">
      
//       <FileUploader />
//       <Contract />
//     </div>
//   );
// }
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';



import Card from "./components/Card"
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';


import { Form, Input, Button as Button2, Radio } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';


// import * as React from 'react';
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FullScreenDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>


        


        <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  border: '1px solid black',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));


const PreviewCard = (props) => {
  const {item, url} = props
  return(
    <div className="card" style={styles.card}>
          <img src={url} style={styles.cardimg} />
          <div className="card-body" style={styles.cardbody}>
              <h2>Card Number: {item.idx + 1}</h2>
            {/* <h2>{item.title}</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
            <h5>{item.author}</h5> */}
          </div>
        </div>
  )
}



// PINATA INFO: 
const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
const pinataApiKey = "909b357f4b9fb06f2c30"
const pinataSecretApiKey = "56f4e5738dbd426702efbe493d4cce53f778482ede18b39440d045fba1b81e9f"
const jwt_secret = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzN2I5YmU4Mi03YWU1LTQ0ZWYtYWU3NS1jOTA5YTZiZTJhODAiLCJlbWFpbCI6Im1hYXJ1bmlwLjIwMjBAc2Npcy5zbXUuZWR1LnNnIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZX0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjkwOWIzNTdmNGI5ZmIwNmYyYzMwIiwic2NvcGVkS2V5U2VjcmV0IjoiNTZmNGU1NzM4ZGJkNDI2NzAyZWZiZTQ5M2Q0Y2NlNTNmNzc4NDgyZWRlMThiMzk0NDBkMDQ1ZmJhMWI4MWU5ZiIsImlhdCI6MTYzODg2OTM3N30.wAzeQcFJi1b5iyMtgHsSpjjCLv57PWutdDYhG-yn66o"

class App extends Component {
  
  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
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
    // console.log("data fetchitemscreated: ", data)



    

    const items = await Promise.all(data.map(async (i) => {
      const tokenUri = await tokenContract.methods.tokenURI(i.tokenId).call()
      // console.log("rendering tokenid: ", i.tokenId, typeof(i.tokenId))
      // console.log("i: ", i)
      const meta = await axios.get(tokenUri)
      // console.log("meta",meta)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: Number(i.tokenId),
        seller: i.seller,
        owner: i.owner,
        sold: i.sold,
        image: meta.data.image,
      }
      return item
    }))

    console.log("items collated: ", items)
    /* create a filtered array of items that have been sold */

    const soldItems = items.filter(i => i.sold)
    this.setState({soldItems: soldItems})
    this.setState({items: items})


    
    const nftdata = await marketContract.methods.fetchMyNFTs().call()
    

    const mynfts = await Promise.all(nftdata.map(async (i) => {
      const tokenUri = await tokenContract.methods.tokenURI(i.tokenId).call()
      // console.log("rendering tokenid: ", i.tokenId, typeof(i.tokenId))
      // console.log("i: ", i)
      const meta = await axios.get(tokenUri)
      // console.log("meta",meta)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: Number(i.tokenId),
        seller: i.seller,
        owner: i.owner,
        sold: i.sold,
        image: meta.data.image,
      }
      return item
    }))

    this.setState({mynfts: mynfts})



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
      dialogopen: false

   }

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.createTask = this.createTask.bind(this);
    this.createMarket = this.createMarket.bind(this);
    this.createSale = this.createSale.bind(this);
    this.handleSubmission =  this.handleSubmission.bind(this);
    this.changeHandler =  this.changeHandler.bind(this);
    this.uploadtoipfs =  this.uploadtoipfs.bind(this);

    this.handleClickOpendialog = this.handleClickOpendialog.bind(this)
    this.handleClosedialog = this.handleClosedialog.bind(this)
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
    alert("going to create task nowwww!")
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
    let transaction = await this.state.tokenContract.methods.createToken(url).send({ from: this.state.account })
    .once('receipt', (receipt) => {
     console.log("token created!: receipt events: ", JSON.stringify(receipt.events))
     tx = receipt.events
     return receipt
});



    // let tx = await transaction.wait()
    // let event = tx.events[0]
    // let value = event.args[2]
    // let tokenId = value.toNumber()
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
    const setprice = ethers.utils.parseUnits('0.0254', 'ether')
    const setprice2 = ethers.utils.parseUnits(listingPrice, 'ether')

    // { value: listingPrice }
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
    alert(`buying tokenid: ${item}`)
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

  
	handleSubmission = async () => {
    console.log("submitting this state : ", this.state)
    // setLoading(true)
    
    const data = new FormData();
    // const jsondata = new FormData();

// formData.append('File', selectedFile);
    data.append('file', this.state.newurl);
    let name_ = this.state.newname
    let description_ = this.state.newname
    let price_ = this.state.newname

    const formdata = [name_,
    description_,
    price_ ]
    console.log("hereeee", formdata)

// fetch(
// 	'https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>',
// 	{
// 		method: 'POST',
// 		body: formData,
// 	}
// )
// 	.then((response) => response.json())
// 	.then((result) => {
// 		console.log('Success:', result);
// 	})
// 	.catch((error) => {
// 		console.error('Error:', error);
// 	});


    //You'll need to make sure that the metadata is in the form of a JSON object that's been convered to a string
    //metadata is optional

    // const metadata = JSON.stringify({
    //     name: 'bhuvan card',
    //     keyvalues: {
    //         exampleKey2: 'exampleValue2'
    //     }
    // });
    // data.append('pinataMetadata', metadata);

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
        // console.log("successful response: ", response)
        console.log("successful response: ", JSON.stringify(response.data))
        // setIPFSHashResponse(response.data.IpfsHash)
        // setIsUploadPhotoSuccess(true)
        // setIPFS({...ipfs, IPFS_image: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash})
        // this.setState( {newimage: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash })

        console.log("hereeee", formdata)
        // JSON UPLOADING 
        const jsonbody = {
          name: formdata[0],
                description: formdata[1], 
                price: formdata[2],
                image: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
           
        }
        const sendingJSON = {
            /* The "pinataMetadata" object will not be part of your content added to IPFS */
            /* Pinata simply stores the metadata provided to help you easily query your JSON object pins */
            // pinataOptions: {
            //     cidVersion: (the integer for your desired CID version),
            //     customPinPolicy: (custom pin policy for this json)
            // },
            // pinataMetadata: {
                
            // },
            /* The contents of the "pinataContent" object will be added to IPFS */
            /* The hash provided back will only represent the JSON contained in this object */
            /* The JSON the returned hash links to will NOT contain the "pinataMetadata" object above */
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


  

//   handleChange(event) {
//     this.setState({new_task: event.target.value});
//   }

//   handleSubmit(event) {
    
//     if (this.state.new_task.length < 5){
//       alert("Invalid length: please enter a valid url")
//     }else{
//       alert('TokenURI submitted: ' + this.state.new_task);
//       this.createTask(this.state.new_task)
//     }
//     event.preventDefault();
//   }
//   createTask(content) {
//     this.setState({ loading: true })
//     console.log("account: ",this.state.account)
//     this.state.todoList.methods.createTask(content).send({ from: this.state.account })
//     .once('receipt', (receipt) => {
//       this.loadBlockchainData()
//       this.setState({new_task: ""});
//       this.setState({ loading: false })
// });
// }


  render() {
    return (
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
         <NFTnumIcon nftcount={this.state.items.length}/><p>NFTs posted on market:</p>
        
        </div>
        
        <Box sx={{ minHeight: 393 }}>
        <Masonry columns={4} spacing={1}>
        {this.state.items.map((item, index) => {
          if (!item.sold){
        return(
          <div style={{display: "flex", flexDirection: "column"}}>
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
      </Box>
      <div style={{display: "flex", justifyContent: "left", alignItems: "center"}}>
         <NFTnumIcon nftcount={this.state.mynfts.length}/><p>NFTs posted on market:</p>
        
        </div>

      <Box sx={{ minHeight: 393 }}>
        <Masonry columns={4} spacing={1}>
        {this.state.mynfts.map((item, index) => {
        return(
          <div style={{diplay: "flex", flexDirection: "column"}}>
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
          
        )})}
      </Masonry>
      </Box>

      {/* // <Item key={index} sx={{  }}>
          //   {index + 1}
          // <h1>{item[1]}</h1>
          // <img style={{width: "200px", height: "200px"}} src={item[1]}/>
          // </Item> */}


        {/* {this.state.tasks.map((item, idx) => {
          return(<h1>{idx + 1}. {item[1]}</h1>)})} */}
    <p>name: {this.state.newname}
    description: {this.state.newdescription}
    {/* newimage: {this.state.newurl.toString()} */}
    price: {this.state.newprice}</p>


  


      <form onSubmit={this.createMarket}>
        <label>
            Select Image:
            <input type="file" name="file" onChange={
              this.changeHandler} />
          </label>
      
        <label>
          Name:
          <input type="text" onChange={e => this.setState({newname: e.target.value })} />
        </label>
        <label>
          Description:
          <input type="text" onChange={e => this.setState({newdescription: e.target.value })} />
        </label>

        <label>
          Price:
          <input type="number" onChange={e => this.setState({newprice: e.target.value })} />
        </label>
        <input type="submit" value="Submit" />
      </form>




      <div>

      <FullScreenDialog />
        <div>
          { this.state.previewurl != null ? 
          (<div>
            <h1>helloo{this.state.previewurl.toString()}</h1>
            {/* <img src={this.state.previewurl}/> */}
            {/* <PreviewCard url={this.state.previewurl} item={{idx: 1}}/> */}
            <Card url={this.state.previewurl} item={{idx: 1}}/> 
            {/* {this.state.newurl.map((item) => {<h1>1</h1>})} */}
            
          </div>) : 
          <div>No image selected</div>
          }
        
        </div>
      </div>
      
      </div>
    );
  }
}


export default App;


const styles={
  container: {
    margin: "50px"

}}
