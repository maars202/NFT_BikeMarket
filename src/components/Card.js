import React, {useState, useEffect} from 'react'
import "./Card.css"
const Card = (props) => {
    const {item, url} = props
    const price = item.price/1000000000000000000
    return(
      <div className="card" style={styles.card}>
            <img src={url} style={styles.cardimg} />
            <div className="card-body" style={styles.cardbody}>
                <h3>Card Number: {item.tokenId}</h3>
              {/* {/* <h2>{item.title}</h2> */}
              {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p> */}
              <h5>Price: {price} ether</h5> 
              {/* <h5>Seller: {item.seller}</h5>  */}
              <div style={{display:"flex", justifyContent: "center", marginTop: "0px"}}>
              {item.sold ? <h3 style={styles.sold}>Sold!</h3>: <h3 style={styles.unsold}>UnSold!</h3> }
              </div>

            </div>
          </div>
    )
  }

  export default Card


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
      padding: "10px"
    },
    sold: {
      color: "grey"
    },
    unsold: {
      color: "green"
    }
}


