import React, { Component } from 'react';
import Web3 from 'web3';
import XYZ from '../../balance/abis/XYZ.json'
import { Form } from '../useForm';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class Send extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const XYZAddress = "0x8b0070828f11247Ed1f479927df558a199342239" // Replace DAI Address Here
    const daiTokenMock = new web3.eth.Contract(XYZ.abi, XYZAddress)

    this.setState({ daiTokenMock: daiTokenMock })
    const balance = await daiTokenMock.methods.balanceOf(this.state.account).call()

    this.setState({ balance: web3.utils.fromWei(balance.toString(), 'Ether') })
    const transactions = await daiTokenMock.getPastEvents('Transfer', { fromBlock: 0, toBlock: 'latest', filter: { from: this.state.account } })
    this.setState({ transactions: transactions })
    console.log(web3.utils.fromWei(balance.toString(), 'Ether'));
  }

  transfer(recipient, amount) {
    this.state.daiTokenMock.methods.transfer(recipient, amount).send({ from: this.state.account })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      daiTokenMock: null,
      balance: 0,
      transactions: [],
      helperText: ''
    }

    this.transfer = this.transfer.bind(this)
  }
  onChange(event) {
    if (event.target.value.length > 0) {
      this.setState({ helperText: '', error: false });
    } else {
      this.setState({ helperText: 'Invalid format', error: true });
    }
  }
  render(){
      return (
          
        <Form onSubmit={(event) => {
                event.preventDefault()
                const recipient = this.recipientRef.value
                const amount = window.web3.utils.toWei(this.amountRef.value, 'Ether')
                this.transfer(recipient, amount)
          }}>
            <div className="form-group mr-sm-2">
            <TextField
                variant="outlined" 
                helperText={this.state.helperText}
                onChange={this.onChange.bind(this)}
                error={this.state.error}
                required
                id="recipient"
                label="Recipient Address"
                inputRef={element => (this.recipientRef = element)}
            />
            <TextField
                variant="outlined" 
                helperText={this.state.helperText}
                onChange={this.onChange.bind(this)}
                error={this.state.error}
                required
                id="amount"
                label="Amount"
                inputRef={element => (this.amountRef = element)}
            />
            <ButtonGroup color="primary" aria-label="outlined primary button group">
                <Button>One Time Transfer</Button>
                <Button>Weekly</Button>
                <Button>Monthly</Button>
            </ButtonGroup>
            <FormControl variant="outlined">
                <InputLabel id="demo-simple-select-label">Pay With Account</InputLabel>
                <Select>
                <MenuItem value={10}>Account1</MenuItem>
                <MenuItem value={20}>Account2</MenuItem>
                <MenuItem value={30}>Account3</MenuItem>
                </Select>
            </FormControl>
            </div>
            <button type="submit">Send</button>
          </Form>
      )
  }
  
}

export default Send;
