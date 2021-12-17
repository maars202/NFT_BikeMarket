
// import React, { Component } from 'react'
import React, {useState, useEffect} from 'react'
import { Box, makeStyles, withStyles, Typography } from "@material-ui/core";
import { styled } from '@mui/styles';
import Button from '@mui/material/Button';
import "./Card.css"
import { Link } from "react-router-dom";
import ReactCardFlip from 'react-card-flip';


// import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Web3 from 'web3'
import { ethers } from 'ethers'
import axios from 'axios'
import { NFT_ADDRESS, NFT_ABI, NFT_MARKET_ADDRESS, NFT_MARKET_ABI
} from '../contractconfig'


// 2af598
// 08B3E5
// 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',

const MyButton = styled(Button)({
    background: 'linear-gradient(45deg, #2af598 30%, #08B3E5 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  });
  

  

const Card = (props) => {

    // const classes = useStyles();
    //   const {item, url} = props
    const {item, url} = props;
    console.log("Frontcard props: ", props)
    //   const item = {"name":"Last supper","description":"Last supper","price":"0.051","tokenId":2,"seller":"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266","owner":"0x0000000000000000000000000000000000000000","sold":false,"image":"https://gateway.pinata.cloud/ipfs/QmS6nzwktxTw9hkZt9XuREd5Nuu8nwLwHUR7d6b5kDjH42"}
    //   const url = "https://gateway.pinata.cloud/ipfs/QmS6nzwktxTw9hkZt9XuREd5Nuu8nwLwHUR7d6b5kDjH42"
      const price = item.price/1000000000000000000
      console.log("item clicked: ",item.tokenId )
      return(
        <div className="card" style={styles.card}>
              <img src={url} style={styles.cardimg} />
              <div className="card-body" style={styles.cardbody}>
              <Link to={"/blog/" + item.tokenId}>Find out more!</Link>
              <CustomColor>
                  <h2 style={{color: "orange"}}>{item.name}</h2>
                  </CustomColor>
                {/* {/* <h2>{item.title}</h2> */}
                {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p> */}
                <h5>Price: {price} ether</h5> 
                {/* <h5>Seller: {item.seller}</h5>  */}
                <div style={{display:"flex", justifyContent: "center", marginTop: "0px", flexDirection: "column"}}>
                {item.sold ? 
                  <div>
                    <h3 style={styles.sold}>Sold!</h3>
                    <MyButton>List on Market</MyButton>
                  </div>
                : <h3 style={styles.unsold}>UnSold!</h3> }
  
                
                </div>
  
              </div>
            </div>
      )
    }
  


const BackCard = (props) => {

    // const classes = useStyles();
    //   const {item, url} = props
    console.log("BackCard props: ", props)
    const item = {"name":"Last supper","description":"Last supper","price":"0.051","tokenId":2,"seller":"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266","owner":"0x0000000000000000000000000000000000000000","sold":false,"image":"https://gateway.pinata.cloud/ipfs/QmS6nzwktxTw9hkZt9XuREd5Nuu8nwLwHUR7d6b5kDjH42"}
      const url = "https://gateway.pinata.cloud/ipfs/QmS6nzwktxTw9hkZt9XuREd5Nuu8nwLwHUR7d6b5kDjH42"

      const price = item.price/1000000000000000000
      console.log("item clicked: ",item.tokenId )
      return(
        <div className="card" style={styles.card}>
            
              <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScXrFj5jdzivrMB4wRbxp4ltGYOrTa4twgQINFxi-ySMukQsYWlUTHC55wagqnts0TWZ4&usqp=CAU"} style={styles.cardimg} />
              <div className="card-body" style={styles.cardbody}>
              <Link to={"/blog/" + item.tokenId}>Find out more!</Link>
              <CustomColor>
                  <h2 style={{color: "orange"}}>{item.name}</h2>
                  </CustomColor>
                {/* {/* <h2>{item.title}</h2> */}
                {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p> */}
                <h5>Price: {price} ether</h5> 
                {/* <h5>Seller: {item.seller}</h5>  */}
                <div style={{display:"flex", justifyContent: "center", marginTop: "0px", flexDirection: "column"}}>
                {item.sold ? 
                  <div>
                    <h3 style={styles.sold}>Sold!</h3>
                    <MyButton>List on Market</MyButton>
                  </div>
                : <h3 style={styles.unsold}>UnSold!</h3> }
  
                
                </div>
  
              </div>
            </div>
      )
    }


const HelloFront = (props) => {
    return(
        <div>Helloooo Front</div>
    )
    }

    

const HelloBack = (props) => {
return(
    <div>Helloooo Back</div>
)
}


async function itempromisemapping(data, tokenContract){

    const dataitems = await Promise.all(data.map(async (i) => {
        
      const tokenUri = await tokenContract.methods.tokenURI(i.tokenId).call()

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


async function loadmarketitems(id) {

    const web3 = new Web3(window.web3.currentProvider);

    const marketContract = new web3.eth.Contract(NFT_MARKET_ABI, NFT_MARKET_ADDRESS)
    const tokenContract = new web3.eth.Contract(NFT_ABI, NFT_ADDRESS)


    const data = await marketContract.methods.fetchMarketItems().call()

    // getting specific info for only one id:
    const itemmatch = data.filter(i => i.tokenId === id)
    console.log("data fetched 2: ", itemmatch)
    const itemmatchdata = await itempromisemapping(itemmatch, tokenContract)
    console.log("items collated: ", itemmatchdata)
    /* create a filtered array of items that have been sold */

    
    return itemmatchdata[0]
}


// class Flip extends React.Component {
    function Flip(props){

    let { tokenid } = useParams();


       const [state, setState] = useState({isFlipped: true})
       const [data, setData] =  useState({})
    //    const [state, setState] = useState({})
       console.log("item received!: ",tokenid )
     
       useEffect(async () => {
         // Fetch post using the postSlug
         const itemmatchdata = await loadmarketitems(tokenid)
         setData(itemmatchdata)
         console.log("this is data to be printed: ", JSON.stringify(data))
     
     
       }, [tokenid]);




    function handleClick(e) {
        console.log("props hereee: ", tokenid)
      e.preventDefault();
      setState(prevState => ({ isFlipped: !prevState.isFlipped }));
      console.log("current flip status: ", state.isFlipped)
    }
  
      return (
        <ReactCardFlip isFlipped={state.isFlipped} flipDirection="vertical">
          <div>
            {data.sold ? <BackCard item={data} url={data.image}/> : 
            <Card item={data} url={data.image}/>}
            <button onClick={handleClick}>Click to flip</button>
          </div>
  
          <div>
          {data.sold ? <BackCard item={data} url={data.image}/> : 
            <Card item={data} url={data.image}/>}
            <button onClick={handleClick}>Click to flip</button>
          </div>
        </ReactCardFlip>
      )
  }


const useStyles = makeStyles((theme) => ({}));
const CustomColor = withStyles({
  root: {
    fontSize: 20,
    background: "-webkit-linear-gradient(45deg, #797EF6 30%, #4ADEDE 90%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  }
})(Typography);

// background: "-webkit-linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",

// #797EF6
// #4ADEDE


const styles = {
    card: {
  //     background: "#fff",
  // // width: "20em",
  // borderRadius: "0.6em",
  // margin: "1px",
  // overflow: "hidden",
  // cursor: "pointer",
  // boxShadow: `0 13px 27px -5px hsla(240, 30.1%, 28%, 0.25), 0 8px 16px -8px hsla(0, 0%, 0%, 0.3), 0 -6px 16px -6px hsla(0, 0%, 0%, 0.03)`,
  // transition: `all ease 200ms`,
  // "&:hover": {
  //   transform: "scale(1.03)",
  //   boxShadow: `0 13px 40px -5px hsla(240, 30.1%, 28%, 0.12), 0 8px 32px -8px hsla(0, 0%, 0%, 0.14), 0 -6px 32px -6px hsla(0, 0%, 0%, 0.02)`,
  // }
  // display: "flex",
  // flexDirection: "column",

    },
    cardimg: {
      width: "100%",
      objectFit: "cover",
    },
    cardbody:{
      padding: "10px",
      textAlign: "center"
    },
    sold: {
      color: "grey"
    },
    unsold: {
      color: "green"
    }
}



  export default Flip;