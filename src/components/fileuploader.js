import React, {useState} from 'react';
import Alert from '@mui/material/Alert';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
// import { isNullOrUndefined } from 'util';
// import { json } from 'stream/consumers';
// import { Body, Button, Header, Image, Link } from "./";
//imports needed for this function

import CardPreview from "./Card"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import CircularProgress from '@mui/material/CircularProgress';
// import { mintNFT } from "../../../scripts/mintnft"

const axios = require('axios');
// const fs = require('fs');
// const fs = require('fs');
// const FormData = require('form-data');
function LoadingButtonsTransition() {
    const [loading, setLoading] = React.useState(false);
    function handleClick() {
        setLoading(!loading);
        setLoading(!loading);
      }
      return (  
        <LoadingButton
        onClick={handleClick}
        endIcon={<SendIcon />}
        loading={loading}
        loadingPosition="end"
        variant="contained"
      >
        Send
      </LoadingButton>
       ) 

}



function MediaCard(props) {
    const { name, url } = props
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          src={url}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Name: {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    );
  }

function FileUploadPage(){
	const [selectedFile, setSelectedFile] = useState();
	// const [isFilePicked, setIsFilePicked] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [isUploadSuccess, setIsUploadSuccess] = useState(null);
    const [isUploadPhotoSuccess, setIsUploadPhotoSuccess] = useState(null);
    const [IPFSHashResponse, setIPFSHashResponse] = useState(null)
    const [ipfs, setIPFS] = useState({
            IPFS_image: "None uploaded",
            IPFS_json: "None uploaded"
    })
    const [preview, setPreview] = useState(true)
    const [carddata, setCardData] = useState([{
            img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
            title: 'Breakfast',
            author: '@bkristastucchio',
            featured: true,
          },])

    const [loading, setLoading] = useState(false)


	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

	const handleSubmission = () => {
        setLoading(true)
		const data = new FormData();
        const jsondata = new FormData();

		// formData.append('File', selectedFile);
        data.append('file', selectedFile);

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
        const metadata = JSON.stringify({
            name: 'bhuvan card',
            keyvalues: {
                exampleKey2: 'exampleValue2'
            }
        });
        data.append('pinataMetadata', metadata);

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
            setIPFSHashResponse(response.data.IpfsHash)
            setIsUploadPhotoSuccess(true)
            setIPFS({...ipfs, IPFS_image: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash})

            setCardData([{
                img: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
                title: 'Breakfast',
                author: '@bkristastucchio',
                featured: true,
              },])

            // JSON UPLOADING 
            const jsonbody = {
                "attributes" : [ {
                  "trait_type" : "trait1",
                  "value" : "dragon"
                }, {
                  "trait_type" : "trait2",
                  "value" : "dragon"
                } ],
                "description" : "studyyyy",
                "image" : "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
                "name" : "animals"
            }
            const sendingJSON = {
                /* The "pinataMetadata" object will not be part of your content added to IPFS */
                /* Pinata simply stores the metadata provided to help you easily query your JSON object pins */
                // pinataOptions: {
                //     cidVersion: (the integer for your desired CID version),
                //     customPinPolicy: (custom pin policy for this json)
                // },
                pinataMetadata: {
                    name: "bhuvan",
                    // keyvalues: {
                    //     customKey: customValue,
                    //     customKey2: customValue2
                    // }
                },
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
                    setIsUploadSuccess(true)
                    setLoading(false)
                    // await mintNFT("https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash)
                    setIPFS({...ipfs, IPFS_json: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash})

                    
                    return {
                        success: true,
                        pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
                    };
                }).catch(error => {
                    console.log("Errorrr JSON: ", error)
                    setLoading(false)
                    return {
                        success: false,
                        message: error.message,
                    };
                })


        })
        .catch(function (error) {
            //handle error 
            console.log("Errorrr: ", error)
            setIsUploadSuccess(false)
        });


        

	};


	return(
        <div>
             <h1>UPLOAD</h1>{loading ? <CircularProgress color="success" /> : <div></div>}
                 <input type="file" name="file" onChange={changeHandler} />

                 {
                //  isSelected ? (
                //      <div>
                //          <p>Filename: {selectedFile.name}</p>
                //          <p>Filetype: {selectedFile.type}</p>
                //          <p>Size in bytes: {selectedFile.size}</p>
                //          <p>
                //              lastModifiedDate:{' '}
                //              {selectedFile.lastModifiedDate.toLocaleDateString()}
                //          </p>
                //      </div>
                //  ) : (
                //      <p>Select a file to show details</p>
                //  )
                 }
                 {/* {
                     if (isUploadSuccess === null){
                         (<h1>Hello</h1>)
                     }else if(isUploadSuccess === true){
                        (<h1>Hello</h1>)
                     }else{
                        (<h1>Hello</h1>)
                     }
                 } */}
                 
                 { isUploadSuccess == true ? 
                     (
                        <div>
                            <Alert severity="success">This is a success alert — check it out!</Alert>
                     
                     {/* <img src={"https://gateway.pinata.cloud/ipfs/"+IPFSHashResponse}/> */}
                     
                     </div> 
                     ) : 
                     
                     <Alert severity="error">This is an error alert — check it out!</Alert>
}


                 <div>
                     <button onClick={handleSubmission}>Submit</button>
                 </div>

                 
                 { carddata.map(item => <CardPreview item={item}/>)}
                 <h2>Image hash: {ipfs.IPFS_image}</h2>
                 <h2>JSON hash: {ipfs.IPFS_json}</h2>
                 
             </div>

         )
     }

     export default FileUploadPage
