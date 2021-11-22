import React, { useState } from 'react'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import { makeStyles} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import pholder from './avatar.png'
import UploadButtons from '../Donation/upload';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import RemoveIcon from '@material-ui/icons/RemoveCircle';
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button';
import {Toolbar, InputAdornment } from '@material-ui/core';
import Controls from '../../controls/Controls';
import { Search } from "@material-ui/icons";
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import { styled } from '@mui/material/styles';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const Data = [
  {name: 'Jack', status: 'Verified Vender'},
  {name: 'Lucy', status: 'Verified Receiver'},
  {name: 'Lee', status: 'Verified Receiver'},
  {name: 'Lucy', status: 'Verified Receiver'},
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
}

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
      height:'629px',
      width:'1256px',
      borderRadius:'25px',
      marginLeft: "100px",
      font: "Lato"
    },
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
    searchInput: {
      width: '100%',
      backgroundColor: "white",
      marginBottom:"2%",
    },
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
    medium: {
      width: theme.spacing(8),
      height: theme.spacing(8),
  },
    paymentCard: {
        marginBottom: theme.spacing(2),
    },
    textF: {
      "& .MuiFilledInput-root": {
        background: "rgb(255, 255, 255)"
      }
    }
}));


export default function Profile() {
  const [name, setName] = useState('');
  const [found, setFound] = useState(Data);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [submit, setSubmit] = useState(false);

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
  }
  
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSubmit = (event) => {
    setSubmit(!submit)
  }

  const Input = styled('input')({
    display: 'none',
  });
  
  

  return (
    <div>
          <div style={{display: 'inline-block', fontFamily: "Lato", size: "24px", ineHeight: "29px", lineHeight: "100%", verticalAlign: "top"}}><Typography variant="h6" id="tableTitle" component="div">Settings</Typography> </div>

    <div className={classes.root}>
      <AppBar position="static" >
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Profile" {...a11yProps(0)} />
          <Tab label="Validation" {...a11yProps(1)} />
          <Tab label="Contact" {...a11yProps(2)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
            <div style={{color:"#000000", fontFamily: "Lato", size: "24px"}}> 
                <Typography variant="h6" component="div" >Lee's Profile</Typography>
                <div style={{display: 'inline-block'}}>
                    <Avatar alt="PlaceHolder" src={pholder} className={classes.large} />
                </div>
                <div style={{fontFamily: "Lato", size: "18px", marginTop: "-70px", marginLeft: "110px"}}>
                    <Typography variant="body1" component="div">Change/Upload Profile Picture</Typography>
              <div style={{display: 'inline-block', marginLeft:'100px', marginTop: "-500px", fontFamily: "Lato", size: "14px"}}>
              <label htmlFor="contained-button-file">
            <Input accept="image/*" id="contained-button-file" multiple type="file" />
            <Button size = "large" variant="contained" component="span" style={{color:"primary", display: 'inline-block', 
            width: "120px", height: "32px", marginLeft: "-100px", marginTop: "20px", fontFamily: "Lato", size: "10px", align: "center"}}>
              upload
            </Button>
           </label>
           </div>
                </div>
            </div>
            <br></br>
            <br></br>
            <div style={{display: 'inline-block', fontFamily: "Lato", size: "20px", fontStyle: "Bold"}}>
                <Typography variant="h6" component="div">Payment Method</Typography>
                </div>

                <div style={{display: 'inline-block', fontFamily: "Lato", size: "16px", Align: "center", marginLeft: "20px", lineHeight: "19px",
lineHeight: "100%", lineClamp: "165px"}}> 
                <Button variant="contained" color="primary">Add A Payment Method</Button>
          </div>

          <div style={{borderRadius: "13px", lineHeight: "19px", lineHeight: "100%", width: "805px", height: "80px"}}>
          <br></br>

                <Card className={classes.paymentCcard}>
                <CardContent>
                  <div style={{display: 'inline-block', fontFamily: "Lato", fontStyle: "Bold", size: "16px", color: "#4E4E4E"}}>
                    <Typography variant="body1" component="div">email123@email.com</Typography>
                    </div>
                    <div style={{display: 'inline-block', fontFamily: "Lato", fontStyle: "Bold", size: "16px", color: "#7EA6F4", marginLeft: "20px"}}>
                    <Typography variant="body1" component="div">Verified Vendor</Typography>
                    </div>
                    <div style={{display: 'inline-block', marginLeft:'350px'}}>
                    <IconButton><RemoveIcon/></IconButton>
                    </div>
                    <div style={{display: 'inline-block', fontFamily: "Lato", size: "14px", color: "#4E4E4E"}}>
                    <Typography variant="body1" component="div">0x98BfA478D7e25f4A424c8f1E96A190368D118b22</Typography>
                    </div>
                </CardContent>
                </Card>

                <br></br>
                <br></br>
                
                <Card className={classes.paymentCard}>
                <CardContent>
                <div style={{display: 'inline-block', fontFamily: "Lato", fontStyle: "Bold", size: "16px", color: "#4E4E4E"}}>
                    <Typography variant="body1" component="div">email123@email.com</Typography>
                    </div>
                    <div style={{display: 'inline-block', fontFamily: "Lato", fontStyle: "Bold", size: "16px", color: "#7EA6F4", marginLeft: "20px"}}>
                    <Typography variant="body1" component="div">Verified Receiver</Typography>
                    </div>
                    <div style={{display: 'inline-block', marginLeft:'342px'}}>
                    <IconButton><RemoveIcon/></IconButton>
                    </div>
                    <div style={{display: 'inline-block', fontFamily: "Lato", size: "14px", color: "#4E4E4E"}}>
                    <Typography variant="body1" component="div">0x98BfA478D7e25f4A424c8f1E96A190368D118b22</Typography>
                    </div>
                </CardContent>
                </Card>
            </div>
      </TabPanel>

      <TabPanel value={value} index={1}>
            <div>
            <div>
              {submit?<div style={{fontFamily: "Lato", size: "24px", fontStyle: "Bold"}}>
            <Typography variant="h6" component="div">Validate your identity</Typography>
            <br></br>
            <div>
            <Card style={{width: "621px", height: "112px", borderRadius: "5px"}} className={classes.paymentCcard}>
                <CardContent>
                <div style={{display: 'inline-block', marginLeft: "20px", marginTop: "10px"}}>
                    <Avatar alt="PlaceHolder" src={pholder} className={classes.medium} />
                </div>
                <div style={{marginLeft:'100px', marginTop: "-50px", fontFamily: "Lato", size: "24px"}}>
                    <Typography variant="body1" component="div">Lee</Typography>
                </div>
                <div style={{marginLeft:'400px', marginTop: "-25px", fontFamily: "Lato", size: "16px"}}>
                    <Typography variant="body1" component="div">In Progress</Typography>
                </div>
                <div style={{marginLeft:'500px', marginTop: "-35px"}}>
                    <IconButton><RemoveIcon/></IconButton>
                </div>
                </CardContent>
                </Card>
                </div >
                <div style={{marginLeft:'700px', marginTop: "-110px", fontFamily: "Lato", size: "20px"}}>
                <Typography variant="body1" component="div">Add another validation or add more documents?</Typography>
                </div>
                <br></br>
                <Button onClick={handleSubmit} size="large" style={{display: 'inline-block', marginLeft: "700px", marginTop: "0px", height: "48px"}} 
                variant="contained" color="primary">Add Validation</Button>
                <br></br>
                <br></br>
                <div style={{display: 'inline-block', marginLeft:'700px', marginTop: "-500px", fontFamily: "Lato", size: "20px"}}>
                <label htmlFor="contained-button-file">
            <Input accept="image/*" id="contained-button-file" multiple type="file" />
            <Button size = "large" variant="contained" component="span" color = "#CEE2FF" style={{color:"primary", display: 'inline-block', 
            width: "138px", height: "48px", marginLeft: "250px", marginTop: "-128px"}}>
              <div style = {{marginLeft: "12px", marginTop: "5px"}}>
              Add File
              </div>
            </Button>
           </label>
           </div>
            </div> :
            <div style={{fontFamily: "Lato", size: "24px", fontStyle: "Bold"}}><Typography variant="h6" component="div">Validate your identity</Typography>
            <br></br>
            <div>
            <div style={{display: 'inline-block', fontFamily: "Lato", size: "24px"}}>
              <Typography variant="body1" component="div"><b>User A </b>  Status: not validated <HelpOutlineIcon></HelpOutlineIcon></Typography>
              </div>

            <div style={{width: "900px", height: "174px", marginTop: "20px", fill: "white", borderRadius: "10px", stroke: "solid"}}>
            <TextField 
              fullWidth
              className={classes.textF}
              id="standard-multiline-static"
              label="Multiline"
              multiline
              rows={10}
              label="Brief statement of your reason for validation"
              id="Type in here"
              defaultValue="Type in here"
              variant="filled"
            />
            </div>
            <div style={{width: "831px", height: "174px", marginTop: "20px", fill: "white", borderRadius: "10px", stroke: "solid"}}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                '& > :not(style)': { m: 1 },
                width: 800,
                maxWidth: '100%',
            }}
              >
            </Box>
            <br></br>
            <label htmlFor="contained-button-file">
            <Input accept="image/*" id="contained-button-file" multiple type="file" />
            <Button size = "large" variant="contained" component="span" color = "#CEE2FF" style={{display: 'inline-block', width: "138px", height: "48px", marginTop: "70px"}}>
              <div style = {{marginLeft: "12px", marginTop: "5px"}}>
              Add File
              </div>
            </Button>

            <div className="poster1">
              <div style={{display: 'inline-block', color: "white", marginLeft: "30px", marginTop: "20px"}}>
            <HorizontalRuleIcon></HorizontalRuleIcon>
                  </div></div>
            <div className="poster2"></div>
           </label>
            <br></br>
            <br></br>
            <Button onClick={handleSubmit} size="large" style={{display: 'inline-block', width: "138px", height: "48px"}} variant="contained" color="primary">Submit</Button>
            <br></br>
            <br></br>
          </div></div></div>
            }
            </div>
            </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
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
        <Grid container spacing={3}>

          {/* {arr} */}
          {found && found.length > 0 ? (
            found.map((d) => (
                    <Grid item xs={12} sm={12}>
                      <div style = {{width: "805px", height: "80px", borderRadius: "13px", marginLeft: "20px"}}>
                    <Card variant="outlined">
                        <CardActionArea>
                        <CardContent>
                            <Typography id = "title" gutterBottom variant="h5" component="h2">{d.name}</Typography>
                            <Typography variant="body2" color="textSecondary" component="p">{d.status}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    </Card>
                    </div>
                </Grid>
            ))
          ) : (
            <Grid item xs={12} sm={6}>
                    <Card variant="outlined">
                        <CardActionArea>
                        <CardContent>
                            <Typography id = "title" gutterBottom variant="h5" component="h2">No Result</Typography>
                            <Typography variant="body2" color="textSecondary" component="p">Placeholder
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">Learn More</Button>
                    </CardActions>
                    </Card>
                </Grid>
          )}

        </Grid>

      </TabPanel>
    </div>
    </div>
  );
}

