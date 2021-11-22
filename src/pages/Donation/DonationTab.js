import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from "@material-ui/core/Button";
import { makeStyles, Toolbar, InputAdornment } from '@material-ui/core';
import Controls from '../../controls/Controls';
import { Search } from "@material-ui/icons";
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { autorun } from "mobx";
import { observer } from 'mobx-react-lite'
import { donationStore } from "../../stores/DonationStore";
import DonationAccordion from "./DonationAccordion"
import './Donation.css';


const Data = [
  {name: 'Help Kids'},
  {name: 'Help Kids'},
  {name: 'Help Veterans'},
  {name: 'Help Veterans'},
  {name: 'Treat Cancer'},
  {name: 'Treat Cancer'},
  {name: 'Education Support'},
  {name: 'Education Support'},
  {name: 'Unintentional Injury'},
  {name: 'Unintentional Injury'},
  
];

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
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#F5F9FF",
    height:'100%',
    width:'110vh',
    borderRadius:'25px',
  },
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3)
  },
  searchInput: {
    width: '100%',
    backgroundColor: "white",
    marginBottom:"2%"
  },
}));

export default function DonationTab() {
  const [name, setName] = useState('');
  const [found, setFound] = useState(Data);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })

  let arr = [];
  const [events, setEvents] = useState([]);
  const API_BASE_URL = `http://localhost:4000`;

  autorun(() => {
    donationStore.isUpdate = false;
    console.log(donationStore.isUpdate)
    fetchDonations();
  });

  const fetchDonations = async () => {
    try {
      const result = await axios.get(`${API_BASE_URL}/app/donation`);
      setEvents(result.data);
    } catch (error) {
      console.log('error')
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);
  // for (let i = 0; i < events.length; i++) {
    arr.push(
      <Grid item xs={12} sm={6}>
        <Card variant="outlined">
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">Please Help</Typography>
              <Typography gutterBottom variant="h5" component="h3">$500/1000</Typography>
              <Typography variant="body2" color="textSecondary" component="p">description placeholder
              </Typography>

            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>);
  // }


  // let arr = [];
  //   for (let i = 0; i < 2; i++) {
  //       arr.push(
  //       <Grid item xs={12} sm={6}>
  //           <Card variant="outlined">
  //               <CardActionArea>
  //               <CardContent>
  //                   <Typography id = "title" gutterBottom variant="h5" component="h2">Help Kids</Typography>
  //                   <Typography variant="body2" color="textSecondary" component="p">Placeholder
  //                   </Typography>
  //               </CardContent>
  //           </CardActionArea>
  //           <CardActions>
  //               <Button size="small" color="primary">Learn More</Button>
  //           </CardActions>
  //           </Card>
  //       </Grid>);
  //   }

  //   for (let i = 2; i < 4; i++) {
  //     arr.push(
  //     <Grid item xs={12} sm={6}>
  //         <Card variant="outlined">
  //             <CardActionArea>
  //             <CardContent>
  //                 <Typography id = "title" gutterBottom variant="h5" component="h2">Help Veteran</Typography>
  //                 <Typography variant="body2" color="textSecondary" component="p">Placeholder
  //                 </Typography>
  //             </CardContent>
  //         </CardActionArea>
  //         <CardActions>
  //             <Button size="small" color="primary">Learn More</Button>
  //         </CardActions>
  //         </Card>
  //     </Grid>);
  // }

const handleSearch = e => {
  const keyword = e.target.value;
  console.log("input is ",keyword)
  if (keyword !== '') {
    const results = Data.filter((d) => {
      return d.name.toLowerCase().includes(keyword.toLowerCase());
    });
    
    setFound(results);
  } else {
    setFound(Data);
  }
  setName(keyword);
    // let target = e.target;
    // setFilterFn({
    //     fn: items => {
    //         if (target.value === "")
    //             return items;
    //         else
    //             return items.filter(x => x.title.toLowerCase().includes(target.value.toLowerCase()))
    //     }
    // })
}


const handleChange = (event, newValue) => {
  setValue(newValue);
};

  return (
    
    <div className={classes.root}>

      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered style={{backgroundColor:'#194db0'}} TabIndicatorProps={{style: {background:'#FD8024'}}}>
          <Tab label="Community" {...a11yProps(0)} />
          <Tab label="Donation" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      
      <TabPanel value={value} index={0} style={{height:'77vh'}}>
        <Toolbar>
            <Controls.Input
                label="Search"
                className={classes.searchInput}
                InputProps={{
                    startAdornment: (<InputAdornment position="start">
                        <Search />
                    </InputAdornment>)
                }}
                onChange={handleSearch}
            />
        </Toolbar>
        <div style={{maxHeight:'66vh', overflow:'auto'}}>
          <Grid container spacing={3}>

          {/* {arr} */}
          {found && found.length > 0 ? (
            found.map((d) => (
                    <Grid item xs={12} sm={6}>
                    <Card variant="outlined">
                        <CardActionArea>
                        <CardContent>
                            <Typography id = "title" gutterBottom variant="h5" component="h2">{d.name}</Typography>
                            <Typography variant="body2" color="textSecondary" component="p">Placeholder
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">Learn More</Button>
                    </CardActions>
                    </Card>
                </Grid>
            ))
          ) : (
            
              <Typography id = "noResult" gutterBottom variant="h5" component="h2" style={{margin:50}}>No Result</Typography>
                            
          )}

          </Grid>
        </div>
        
      </TabPanel>
      <TabPanel value={value} index={1} style={{height:'77vh'}}>
        <Typography variant="h6" id="tableTitle" component="div">Donation History</Typography>
        <div style={{maxHeight:'66vh', overflow:'auto'}}>
            <DonationAccordion/>
        </div>
            
      </TabPanel>
    </div>
    
  );
}