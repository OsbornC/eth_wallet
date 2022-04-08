import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import UploadButtons from "../Donation/upload";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import RemoveIcon from "@material-ui/icons/RemoveCircle";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { Toolbar, InputAdornment } from "@material-ui/core";
import Controls from "../../controls/Controls";
import { Search } from "@material-ui/icons";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import { styled } from "@mui/material/styles";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CardHeader } from "@mui/material";
import { TableContainer } from "@material-ui/core";
import { Form, FormLabel } from "react-bootstrap";

const Data = [
  { name: "Jack", status: "Verified Vendor" },
  { name: "Lucy", status: "Verified Receiver" },
  { name: "Lee", status: "Verified Receiver" },
  { name: "Lucy", status: "Verified Receiver" },
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#F5F9FF",
    height: "629px",
    width: "1256px",
    borderRadius: "25px",
    marginLeft: "100px",
    font: "Lato",
  },
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "100%",
    backgroundColor: "white",
    marginBottom: "2%",
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
      background: "rgb(255, 255, 255)",
    },
  },
}));

export default function Profile() {
  let { currentUser } = useAuth();
  let user_email = currentUser.email;

  const [name, setName] = useState("");
  const [found, setFound] = useState(Data);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [submit, setSubmit] = useState(false);

  const [avatarUrl, setAvatarUrl] = useState("");

  const handleSearch = (e) => {
    const keyword = e.target.value;
    console.log("input is ", keyword);
    if (keyword !== "") {
      const results = Data.filter((d) => {
        return d.name.toLowerCase().includes(keyword.toLowerCase());
      });

      setFound(results);
    } else {
      setFound(Data);
    }
    setName(keyword);
  };
  const handleSubmit = (event) => {
    setSubmit(!submit);
  };

  const Input = styled("input")({
    display: "none",
  });

  // tab content -- My Request
  const API_BASE_URL = `http://localhost:4000`;

  const handleChange = (event, newValue) => {
    console.log("newValue", newValue);
    setValue(newValue); // set tab index
    if (newValue == 0) {
      fetchProfile();
    } else if (newValue == 1) {
      fetchRequests();
    } else if (newValue == 2) {
      fetchDonationsByUser();
    }
  };

  const [events, setEvents] = useState([]);

  const fetchRequests = async () => {
    try {
      const result = await axios.get(`${API_BASE_URL}/app/donation`);
      setEvents(result.data);
    } catch (error) {
      console.log("cannot fetch all projects", error);
    }
  };

  // display request history

  function createData(
    id,
    created_on,
    title,
    vendor,
    current_amount,
    target_amount,
    status
  ) {
    return {
      id,
      created_on,
      title,
      vendor,
      current_amount,
      target_amount,
      status,
    };
  }
  let rows_req = [];
  for (let i = 0; i < events.length; i++) {
    if (events[i].user_email === user_email) {
      // const amount_usd = events[i].donated_amount * 0.25;
      rows_req.push(
        createData(
          i,
          events[i].date,
          events[i].title,
          events[i].vendor_name,
          events[i].current_amount,
          events[i].target_amount,
          "Verified"
        )
      );
    }
  }

  // tab content -- My Donation

  const [myDonations, setMyDonations] = useState([]);

  const fetchDonationsByUser = async () => {
    try {
      const result = await axios.get(
        `${API_BASE_URL}/app/find-donations-by-user`,
        {
          params: {
            email: user_email,
          },
        }
      );
      console.log("result.data", result.data);
      setMyDonations(result.data);
    } catch (error) {
      console.log("cannot fetch donation records by user", error);
    }
  };

  // display my donation history

  function createDonations(id, donated_on, title, donated_amount, amountUSD) {
    return {
      id,
      donated_on,
      title,
      donated_amount,
      amountUSD,
    };
  }
  let rows_don = [];
  for (let i = 0; i < myDonations.length; i++) {
    rows_don.push(
      createDonations(
        i,
        myDonations[i].donated_on,
        myDonations[i].title,
        myDonations[i].donated_amount,
        myDonations[i].amountUSD
      )
    );
  }
  // get user avatar
  // get user object
  const fetchProfile = async () => {
    await axios
      .get(`${API_BASE_URL}/app/user`, { params: { user_email: user_email } })
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        setAvatarUrl(res.data);
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleAvatarSubmit = async () => {
    await axios
      .post(`${API_BASE_URL}/app/change-avatar`, {
        user_email: user_email,
        avatarUrl: avatarUrl,
      })
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        console.log("avatar change response", res);
        setAvatarUrl(avatarUrl);
      });
  };

  return (
    <div>
      <div
        style={{
          color: "#000000",
          fontFamily: "Lato",
          size: "24px",
          marginLeft: "5px",
        }}
      >
        <Avatar alt="PlaceHolder" src={avatarUrl} className={classes.large} />
        <div
          style={{
            fontFamily: "Lato",
            size: "18px",
            marginTop: "-70px",
            marginLeft: "110px",
          }}
        >
          <Typography variant="h6" component="div">
            Currently logged in as: {user_email}
          </Typography>
          <br />
          <br />
        </div>
      </div>
      {/* <div className={classes.root}> */}
      <div
        style={{
          color: "#000000",
          fontFamily: "Lato",
          size: "24px",
          marginLeft: "5px",
        }}
      >
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Setting" {...a11yProps(0)} />
            <Tab label="My Request" {...a11yProps(1)} />
            <Tab label="My Donation" {...a11yProps(2)} />
            <Tab label="My Validation" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Form onSubmit={handleAvatarSubmit}>
            <Form.Group>
              <FormLabel> Enter new avatar url:</FormLabel>
              <Form.Control
                type="text"
                onChange={(e) => setAvatarUrl(e.target.value)}
                style={{ width: 550 }}
              />
            </Form.Group>
            <Form.Group>
              <Button variant="outlined" color="primary" type="submit">
                Change Profile Picture
              </Button>
            </Form.Group>
          </Form>
          <div
            style={{
              display: "inline-block",
              fontFamily: "Lato",
              size: "20px",
              fontStyle: "Bold",
            }}
          >
            <Typography variant="h6" component="div">
              Payment Method
            </Typography>
          </div>

          <div
            style={{
              display: "inline-block",
              fontFamily: "Lato",
              size: "16px",
              Align: "center",
              marginLeft: "20px",
              lineHeight: "19px",
              lineHeight: "100%",
              lineClamp: "165px",
            }}
          >
            <Button variant="contained" color="primary">
              Add A Payment Method
            </Button>
          </div>

          <div
            style={{
              borderRadius: "13px",
              lineHeight: "19px",
              lineHeight: "100%",
              width: "805px",
              height: "80px",
            }}
          >
            <br></br>

            <Card className={classes.paymentCcard}>
              <CardContent>
                <div
                  style={{
                    display: "inline-block",
                    fontFamily: "Lato",
                    fontStyle: "Bold",
                    size: "16px",
                    color: "#4E4E4E",
                  }}
                >
                  <Typography variant="body1" component="div">
                    email123@email.com
                  </Typography>
                </div>
                <div
                  style={{
                    display: "inline-block",
                    fontFamily: "Lato",
                    fontStyle: "Bold",
                    size: "16px",
                    color: "#7EA6F4",
                    marginLeft: "20px",
                  }}
                >
                  <Typography variant="body1" component="div">
                    Verified Vendor
                  </Typography>
                </div>
                <div
                  style={{
                    display: "inline-block",
                    marginLeft: "350px",
                  }}
                >
                  <IconButton>
                    <RemoveIcon />
                  </IconButton>
                </div>
                <div
                  style={{
                    display: "inline-block",
                    fontFamily: "Lato",
                    size: "14px",
                    color: "#4E4E4E",
                  }}
                >
                  <Typography variant="body1" component="div">
                    0x98BfA478D7e25f4A424c8f1E96A190368D118b22
                  </Typography>
                </div>
              </CardContent>
            </Card>

            <br></br>
            <br></br>

            <Card className={classes.paymentCard}>
              <CardContent>
                <div
                  style={{
                    display: "inline-block",
                    fontFamily: "Lato",
                    fontStyle: "Bold",
                    size: "16px",
                    color: "#4E4E4E",
                  }}
                >
                  <Typography variant="body1" component="div">
                    email123@email.com
                  </Typography>
                </div>
                <div
                  style={{
                    display: "inline-block",
                    fontFamily: "Lato",
                    fontStyle: "Bold",
                    size: "16px",
                    color: "#7EA6F4",
                    marginLeft: "20px",
                  }}
                >
                  <Typography variant="body1" component="div">
                    Verified Receiver
                  </Typography>
                </div>
                <div
                  style={{
                    display: "inline-block",
                    marginLeft: "342px",
                  }}
                >
                  <IconButton>
                    <RemoveIcon />
                  </IconButton>
                </div>
                <div
                  style={{
                    display: "inline-block",
                    fontFamily: "Lato",
                    size: "14px",
                    color: "#4E4E4E",
                  }}
                >
                  <Typography variant="body1" component="div">
                    0x98BfA478D7e25f4A424c8f1E96A190368D118b22
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Card>
            <CardHeader title="Donation History" />
            <TableContainer component={Paper}>
              <Table md={8} aira-label="Donation History">
                <TableHead>
                  <TableRow>
                    <TableCell>Created On</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Vendor</TableCell>
                    <TableCell>Amount Raised (XYZ Token)</TableCell>
                    <TableCell>Target Amount (XYZ Token)</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows_req.map((row) => (
                    <TableRow
                      key={row.i}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.created_on}
                      </TableCell>
                      <TableCell align="left">{row.title}</TableCell>
                      <TableCell align="left">{row.vendor}</TableCell>
                      <TableCell align="left">{row.current_amount}</TableCell>
                      <TableCell align="left">{row.target_amount}</TableCell>
                      <TableCell align="left">{row.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Card>
            <CardHeader title="Donation History" />
            <TableContainer component={Paper}>
              <Table md={8} aira-label="Donation History">
                <TableHead>
                  <TableRow>
                    <TableCell>Donated On</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Amount Donated (XYZ Token)</TableCell>
                    <TableCell>In USD</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows_don.map((row) => (
                    <TableRow
                      key={row.i}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.donated_on}
                      </TableCell>
                      <TableCell align="left">{row.title}</TableCell>
                      <TableCell align="left">{row.donated_amount}</TableCell>
                      <TableCell align="left">{row.amountUSD}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <div>
            <div>
              {submit ? (
                <div
                  style={{
                    fontFamily: "Lato",
                    size: "24px",
                    fontStyle: "Bold",
                  }}
                >
                  <Typography variant="h6" component="div">
                    Validate your identity
                  </Typography>
                  <br></br>
                  <div>
                    <Card
                      style={{
                        width: "621px",
                        height: "112px",
                        borderRadius: "5px",
                      }}
                      className={classes.paymentCcard}
                    >
                      <CardContent>
                        <div
                          style={{
                            display: "inline-block",
                            marginLeft: "20px",
                            marginTop: "10px",
                          }}
                        ></div>
                        <div
                          style={{
                            marginLeft: "100px",
                            marginTop: "-50px",
                            fontFamily: "Lato",
                            size: "24px",
                          }}
                        >
                          <Typography variant="body1" component="div">
                            Lee
                          </Typography>
                        </div>
                        <div
                          style={{
                            marginLeft: "400px",
                            marginTop: "-25px",
                            fontFamily: "Lato",
                            size: "16px",
                          }}
                        >
                          <Typography variant="body1" component="div">
                            In Progress
                          </Typography>
                        </div>
                        <div
                          style={{
                            marginLeft: "500px",
                            marginTop: "-35px",
                          }}
                        >
                          <IconButton>
                            <RemoveIcon />
                          </IconButton>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div
                    style={{
                      marginLeft: "700px",
                      marginTop: "-110px",
                      fontFamily: "Lato",
                      size: "20px",
                    }}
                  >
                    <Typography variant="body1" component="div">
                      Add another validation or add more documents?
                    </Typography>
                  </div>
                  <br></br>
                  <Button
                    onClick={handleSubmit}
                    size="large"
                    style={{
                      display: "inline-block",
                      marginLeft: "700px",
                      marginTop: "0px",
                      height: "48px",
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Add Validation
                  </Button>
                  <br></br>
                  <br></br>
                  <div
                    style={{
                      display: "inline-block",
                      marginLeft: "700px",
                      marginTop: "-500px",
                      fontFamily: "Lato",
                      size: "20px",
                    }}
                  >
                    <label htmlFor="contained-button-file">
                      <Input
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
                      />
                      <Button
                        size="large"
                        variant="contained"
                        component="span"
                        color="#CEE2FF"
                        style={{
                          color: "primary",
                          display: "inline-block",
                          width: "138px",
                          height: "48px",
                          marginLeft: "250px",
                          marginTop: "-128px",
                        }}
                      >
                        <div
                          style={{
                            marginLeft: "12px",
                            marginTop: "5px",
                          }}
                        >
                          Add File
                        </div>
                      </Button>
                    </label>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    fontFamily: "Lato",
                    size: "24px",
                    fontStyle: "Bold",
                  }}
                >
                  <Typography variant="h6" component="div">
                    Validate your identity
                  </Typography>
                  <br></br>
                  <div>
                    <div
                      style={{
                        display: "inline-block",
                        fontFamily: "Lato",
                        size: "24px",
                      }}
                    >
                      <Typography variant="body1" component="div">
                        <b>User A </b> Status: not validated{" "}
                        <HelpOutlineIcon></HelpOutlineIcon>
                      </Typography>
                    </div>

                    <div
                      style={{
                        width: "900px",
                        height: "174px",
                        marginTop: "20px",
                        fill: "white",
                        borderRadius: "10px",
                        stroke: "solid",
                      }}
                    >
                      <TextField
                        fullWidth
                        className={classes.textF}
                        // id="standard-multiline-static"
                        // label="Multiline"
                        multiline
                        rows_req={10}
                        label="Brief statement of your reason for validation"
                        id="Type in here"
                        defaultValue="Type in here"
                        variant="filled"
                      />
                    </div>
                    <div
                      style={{
                        width: "831px",
                        height: "174px",
                        marginTop: "20px",
                        fill: "white",
                        borderRadius: "10px",
                        stroke: "solid",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          "& > :not(style)": {
                            m: 1,
                          },
                          width: 800,
                          maxWidth: "100%",
                        }}
                      ></Box>
                      <br></br>
                      <label htmlFor="contained-button-file">
                        <Input
                          accept="image/*"
                          id="contained-button-file"
                          multiple
                          type="file"
                        />
                        <Button
                          size="large"
                          variant="contained"
                          component="span"
                          color="#CEE2FF"
                          style={{
                            display: "inline-block",
                            width: "138px",
                            height: "48px",
                            marginTop: "70px",
                          }}
                        >
                          <div
                            style={{
                              marginLeft: "12px",
                              marginTop: "5px",
                            }}
                          >
                            Add File
                          </div>
                        </Button>

                        <div className="poster1">
                          <div
                            style={{
                              display: "inline-block",
                              color: "white",
                              marginLeft: "30px",
                              marginTop: "20px",
                            }}
                          >
                            <HorizontalRuleIcon></HorizontalRuleIcon>
                          </div>
                        </div>
                        <div className="poster2"></div>
                      </label>
                      <br></br>
                      <br></br>
                      <Button
                        onClick={handleSubmit}
                        size="large"
                        style={{
                          display: "inline-block",
                          width: "138px",
                          height: "48px",
                        }}
                        variant="contained"
                        color="primary"
                      >
                        Submit
                      </Button>
                      <br></br>
                      <br></br>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabPanel>
      </div>
    </div>
  );
}
