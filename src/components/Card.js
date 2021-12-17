import React, {useState, useEffect} from 'react'
import { Box, makeStyles, withStyles, Typography } from "@material-ui/core";
import { styled } from '@mui/styles';
import Button from '@mui/material/Button';
import "./Card.css"
import { Link } from "react-router-dom";

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

  const classes = useStyles();
    const {item, url} = props
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
