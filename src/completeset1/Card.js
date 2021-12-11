import React, {useState, useEffect} from 'react'
import "./Card.css"
const Card = (props) => {
    const {item, url} = props
    return(
      <div className="card" style={styles.card}>
            <img src={url} style={styles.cardimg} />
            <div className="card-body" style={styles.cardbody}>
                <h2>NFT no: #{item.idx + 1}</h2>
              {/* <h2>{item.title}</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
              <h5>{item.author}</h5> */}
            </div>
          </div>
    )
  }

  export default Card


const styles = {
    maincontainer: {
        backgroundColor: "pink",
        margin: "30px",
        display: "grid",

        // marginVer: "30px"
        gridTemplateColumns: "50px 50px 50px 50px",
  gridTemplateRows: "auto",
  gridTemplateAreas:
    `header header header header"
    "main main . sidebar"
    "footer footer footer footer`,
    },
    container: {
        backgroundColor: "pink",
        margin: "30px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"


    },
    col: {

        backgroundColor: "yellow",
        display: "flex",
        flexDirection: "column",
    
    },
    col2: {
        backgroundColor: "green",
    },
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


    },
    cardimg: {
      width: "100%",
      objectFit: "cover",
    },
    cardbody:{
      padding: "10px"
    }
}


