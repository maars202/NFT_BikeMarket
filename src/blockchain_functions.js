import {address, contract_abi} from "./contractconfig"

async function loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const accounts = await web3.eth.getAccounts()
    // this.setState({ account: accounts[0] })
    const todoList = new web3.eth.Contract(contract_abi, address)
    // this.setState({ todoList })
    const greeting = await todoList.methods.greet().call()
    console.log(greeting)
    // this.setState({ taskCount })
    // for (var i = 1; i <= taskCount; i++) {
    //   const task = await todoList.methods.tasks(i).call()
    //   this.setState({
    //     tasks: [...this.state.tasks, task]
    //   })
    // }
}

loadBlockchainData()