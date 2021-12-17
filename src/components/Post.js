import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Web3 from 'web3'
import { ethers } from 'ethers'
import axios from 'axios'
import { NFT_ADDRESS, NFT_ABI, NFT_MARKET_ADDRESS, NFT_MARKET_ABI
} from '../contractconfig'


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


    const data = await marketContract.methods.fetchItemsCreated().call()

    // getting specific info for only one id:
    const itemmatch = data.filter(i => i.tokenId === id)
    console.log("data fetched 2: ", itemmatch)
    const itemmatchdata = await itempromisemapping(itemmatch, tokenContract)
    console.log("items collated: ", itemmatchdata)
    /* create a filtered array of items that have been sold */

    
    return itemmatchdata[0]
}

function Post() {
  let { tokenid } = useParams();
  const [state, setState] = useState({})
  console.log("item received!: ",tokenid )

  useEffect(async () => {
    // Fetch post using the postSlug
    const itemmatchdata = await loadmarketitems(tokenid)
    setState(itemmatchdata)
    console.log("this is data to be printed: ", JSON.stringify(itemmatchdata))


  }, [tokenid]);

  return (
    <div className="home">
      <div class="container">
        <h1 className="mt-5">This is a Post Title</h1>
        <h6 className="mb-5">The post slug is, {tokenid}</h6>
        <img src={state.image}/>
        <p>
            
          Description: {state.description}
        </p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
          </p>
      </div>
    </div>
  );
}

export default Post;