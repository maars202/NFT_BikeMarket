import logo from './logo.svg';
import './App.css';
import React, { Component, useState } from 'react'
import Web3 from 'web3'
import Contract from "./components/basic"
import FileUploader from './components/fileuploader';
import NFTnumIcon from "./components/NFTiconsnum"
// import {address, contract_abi} from "./contractconfig"
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './contractconfig'
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


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  border: '1px solid black',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));


class App extends Component {

  // const [taskName, setTaskName] = useState("");
  
  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({ account: accounts[0] })
    const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS)
    console.log("first contract: ",todoList)
    this.setState({ todoList })
    const taskCount = await todoList.methods.taskCount().call()
    console.log("taskCount: ", taskCount)
    this.setState({ taskCount })
    this.setState({
      tasks:[]
    })
    for (var i = 1; i <= taskCount; i++) {
      const task = await todoList.methods.tasks(i).call()
      console.log("task: ",task )
      this.setState({
        tasks: [...this.state.tasks, task]
      })
      
    }

    this.setState({ loading: false })
    
  }

  constructor(props) {
    super(props)
    this.state = { 
      account: '',
      taskCount: 0,
      tasks: [],
      new_task: '',
      loading: true

   }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createTask = this.createTask.bind(this);
  }
  

  handleChange(event) {
    this.setState({new_task: event.target.value});
  }

  handleSubmit(event) {
    
    if (this.state.new_task.length < 5){
      alert("Invalid length: please enter a valid url")
    }else{
      alert('TokenURI submitted: ' + this.state.new_task);
      this.createTask(this.state.new_task)
    }
    event.preventDefault();
  }
  createTask(content) {
    this.setState({ loading: true })
    console.log("account: ",this.state.account)
    this.state.todoList.methods.createTask(content).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.loadBlockchainData()
      this.setState({new_task: ""});
      this.setState({ loading: false })
});
}

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
         <NFTnumIcon nftcount={this.state.taskCount}/><p>Your NFTs:</p>
        
        </div>
        
        <Box sx={{ minHeight: 393 }}>
        <Masonry columns={4} spacing={1}>
        {this.state.tasks.map((item, index) => (
          <Card url={item[1]} item={{idx: index}}/>
          // <Item key={index} sx={{  }}>
          //   {index + 1}
          // <h1>{item[1]}</h1>
          // <img style={{width: "200px", height: "200px"}} src={item[1]}/>
          // </Item>
        ))}
      </Masonry>
      </Box>
        {/* {this.state.tasks.map((item, idx) => {
          return(<h1>{idx + 1}. {item[1]}</h1>)})} */}


      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.new_task} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      
      </div>
    );
  }
}


export default App;


const styles={
  container: {
    margin: "50px"

}}
