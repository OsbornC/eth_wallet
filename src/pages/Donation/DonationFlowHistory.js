import React from "react";
import {useState} from 'react';
import { Switch, Route, NavLink } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Web3 from 'web3';
import { Component } from 'react'; 
// import './App.css';
import XYZ from '../../balance/abis/XYZ.json'
import { Table} from '@material-ui/core';

class  DonattionFlowHistory extends Component {
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
    this.setState({ account: this.props.address })
    const XYZAddress = "0x8b0070828f11247Ed1f479927df558a199342239" // Replace DAI Address Here
    const daiTokenMock = new web3.eth.Contract(XYZ.abi, XYZAddress)

    this.setState({ daiTokenMock: daiTokenMock })
    const balance = await daiTokenMock.methods.balanceOf(this.state.account).call()

    this.setState({ balance: web3.utils.fromWei(balance.toString(), 'Ether') })
    const transactions = await daiTokenMock.getPastEvents('Transfer', { fromBlock: 0, toBlock: 'latest', filter: { from: this.state.account } })
    this.setState({ transactions: transactions })
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
      seen:false
    }

    this.transfer = this.transfer.bind(this)
  }
  render() {
    return (
            <Table aria-label="simple table" >
                <TableHead>
                  <TableRow>
                    <TableCell >Receiver</TableCell>
                    <TableCell>Transaction ID</TableCell>
                    <TableCell >Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                { this.state.transactions.map((tx, key) => {
                      return (
                        <TableRow key={key}>
                        <TableCell  style={{fontSize:'0.71em'}}>{tx.returnValues.to}</TableCell>
                        <TableCell  style={{fontSize:'0.71em'}}>{tx.id}</TableCell>
                        <TableCell  style={{fontSize:'0.71em'}}>{window.web3.utils.fromWei(tx.returnValues.value.toString(), 'Ether')}</TableCell>
                      </TableRow>
                      )
                    }) }
                </TableBody>
              </Table>
    );
  }
}

export default DonattionFlowHistory