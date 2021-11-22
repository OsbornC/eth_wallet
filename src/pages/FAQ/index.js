import React from "react";
import {useState} from 'react';
import { Switch, Route, NavLink } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useTable } from 'react-table'
import AppBar from '@material-ui/core/AppBar';
import Web3 from 'web3';
import { Component } from 'react'; 
// import './App.css';
import XYZ from '../../balance/abis/XYZ.json'
import { get } from "axios";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import { Table} from '@material-ui/core';
import HomeSend from '../../balance/components/HomeSend';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


class  FAQ extends Component {
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
    const from_transactions = await daiTokenMock.getPastEvents('Transfer', { fromBlock: 0, toBlock: 'latest', filter: { from: this.state.account } })
    const to_transactions = await daiTokenMock.getPastEvents('Transfer', { fromBlock: 0, toBlock: 'latest', filter: { to: this.state.account } })
    this.setState({ from_transactions: from_transactions })
    this.setState({ to_transactions: to_transactions })
    console.log(web3.utils.fromWei(balance.toString(), 'Ether'));
    console.log(this.state);
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
      from_transactions: [],
      to_transactions: [],
      seen:false,
      value: 0
    }

    this.transfer = this.transfer.bind(this)
  }
  handleChange = (event, newValue) => {
    this.setState({
      value: newValue
    })
  };
  togglePop = () => {
    this.setState({
      seen: !this.state.seen
    });
  };


  render() {
    return (
        <div>
       <CssBaseline />
       <AppBar position="static">
       <Tabs value={this.state.value} aria-label="simple tabs example" 
       onChange={this.handleChange}
       centered style={{backgroundColor:'#194db0'}} 
       TabIndicatorProps={{style: {background:'#FD8024'}}}>
           <Tab label="From" {...a11yProps(0)}/>
           <Tab label="To" {...a11yProps(1)}/>
         </Tabs>
       </AppBar>
       <TabPanel value={this.state.value} index={0} style={{height:'77vh'}}>
       {/* <Table columns={col} /> */}
          <div className="mainblock" id="transactionTable">
          <Paper>
              <Table aria-label="simple table">
                <TableHead>
                  <TableCell>
                  Name
                </TableCell>
                <TableCell >
                  Info
                </TableCell>
                  <TableRow>
                    <TableCell>Sender</TableCell>
                    <TableCell>Transaction ID</TableCell>
                    <TableCell >Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                { this.state.from_transactions.map((tx, key) => {
                      return (
                        <TableRow key={key}>
                        <TableCell >{tx.returnValues.to}</TableCell>
                        <TableCell>{tx.id}</TableCell>
                        <TableCell>{window.web3.utils.fromWei(tx.returnValues.value.toString(), 'Ether')}</TableCell>
                      </TableRow>
                      )
                    }) }
                </TableBody>
              </Table>
            </Paper>
          </div>
          </TabPanel>
          <TabPanel value={this.state.value} index={1}>
          <Paper>
              <Table aria-label="simple table">
                <TableHead>
                  <TableCell>
                  Name
                </TableCell>
                <TableCell >
                  Info
                </TableCell>
                  <TableRow>
                    <TableCell>Receiver</TableCell>
                    <TableCell>Transaction ID</TableCell>
                    <TableCell >Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                { this.state.to_transactions.map((tx, key) => {
                      return (
                        <TableRow key={key}>
                        <TableCell >{tx.returnValues.to}</TableCell>
                        <TableCell>{tx.id}</TableCell>
                        <TableCell>{window.web3.utils.fromWei(tx.returnValues.value.toString(), 'Ether')}</TableCell>
                      </TableRow>
                      )
                    }) }
                </TableBody>
              </Table>
            </Paper>
          </TabPanel>
          </div>
    );
  }
}

// function Table({ columns, data }) {
//   // Use the state and functions returned from useTable to build your UI
//   data = []
//   const { getTableProps, headerGroups, rows, prepareRow } = useTable({
//     columns,
//     data,
//   })
  

//   // Render the UI for your table
//   return (
//     <MaUTable {...getTableProps()}>
//       <TableHead>
//         {headerGroups.map(headerGroup => (
//           <TableRow {...headerGroup.getHeaderGroupProps()}>
//             {headerGroup.headers.map(column => (
//               <TableCell {...column.getHeaderProps()}>
//                 {column.render('Header')}
//               </TableCell>
//             ))}
//           </TableRow>
//         ))}
//       </TableHead>
//       <TableBody>
//         {rows.map((row, i) => {
//           prepareRow(row)
//           return (
//             <TableRow {...row.getRowProps()}>
//               {row.cells.map(cell => {
//                 return (
//                   <TableCell {...cell.getCellProps()}>
//                     {cell.render('Cell')}
//                   </TableCell>
//                 )
//               })}
//             </TableRow>
//           )
//         })}
//       </TableBody>
//     </MaUTable>
//   )
// }

// function FAQ() {
  // const columns =[
  //     {
  //       Header: 'Name',
  //       columns: [
  //         {
  //           Header: 'Receiver',
  //           accessor: 'receiver',
  //         },
  //       ],
  //     },
  //     {
  //       Header: 'Info',
  //       columns: [
  //         {
  //           Header: 'Transaction ID',
  //           accessor: 'id',
  //         },
  //         {
  //           Header: 'Amount',
  //           accessor: 'amount',
  //         },
  //       ],
  //     },
  //   ]

  // const [col, setCol] = useState(columns);

  // const handleChange1 = (event, newValue) => {
  //   const new_columns =  [
  //       {
  //         Header: 'Name',
  //         columns: [
  //           {
  //             Header: 'Receiver',
  //             accessor: 'receiver',
  //           },
  //         ],
  //       },
  //       {
  //         Header: 'Info',
  //         columns: [
  //           {
  //             Header: 'Transaction ID',
  //             accessor: 'id',
  //           },
  //           {
  //             Header: 'Amount',
  //             accessor: 'amount',
  //           },
  //         ],
  //       },
  //     ]
  //   setCol(new_columns)
  // };
  // const handleChange2 = (event, newValue) => {
  //   const new_columns =  [
  //     {
  //       Header: 'Name',
  //       columns: [
  //         {
  //           Header: 'Sender',
  //           accessor: 'sender',
  //         },
  //       ],
  //     },
  //     {
  //       Header: 'Info',
  //       columns: [
  //         {
  //           Header: 'Transaction ID',
  //           accessor: 'id',
  //         },
  //         {
  //           Header: 'Amount',
  //           accessor: 'amount',
  //         },
  //       ],
  //     },
  //   ]
  // setCol(new_columns)
  // };
//   // const data = React.useMemo(() => makeData(20), [])

//   return (
//     <div>
//       <CssBaseline />
//       <AppBar position="static">
//       <Tabs aria-label="simple tabs example" centered>
//           <Tab label="From" onClick={handleChange1}/>
//           <Tab label="To" onClick={handleChange2}/>
//         </Tabs>
//       </AppBar>
//       <Table columns={col} />
//     </div>
//   )
// }

export default FAQ


// export default function FAQ() {
//   return (
//     <div>
//       <h1 className="Header">FAQ</h1>
//       <FAQNavLinks />
//       <Switch>
//         <Route path="/faq/swimming" component={() => <div>Swimming</div>} />
//         <Route path="/faq/waterpolo" component={() => <div>Water Polo</div>} />
//       </Switch>
//     </div>
//   );
// }
