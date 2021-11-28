import React, { useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DonattionFlowHistory from './DonationFlowHistory';
const API_BASE_URL = `http://localhost:4000`;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: "0.9vw",
    marginRight: 50
  },
  secondaryHeading: {
    fontSize: "0.8vw",
    color: theme.palette.text.secondary,
  },
  donationAccordion: {
    margin: 15,
    height: '7vh'
  },
  donationBox: {
    boxShadow: 'none',
    borderRadius: 20
  },
  details: {
    overflow: "scroll"
  }
}));



export default function ControlledAccordions() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [address, setAddress] = React.useState([])
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    const fetchDonatedAddress = async () => {
      const userName = localStorage.getItem('userName')
      const result = await axios.post(`${API_BASE_URL}/app/donatedAddress`, {
        userName
      })
      console.log('donated', result.data)
      result.data && setAddress(result.data)
      console.log('donatedAddress', address, userName, result)
    }
    fetchDonatedAddress()
  }, [null]);

  return (
    <div className={classes.root}>
      {address && address.length > 0 && address.map((d, i) => {
        return (<Accordion expanded={expanded === `panel${i + 1}`} onChange={handleChange(`panel${i + 1}`)} className={classes.donationBox}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className={classes.donationAccordion}
          >
            <Typography className={classes.heading}>Donated To: {d}</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            <DonattionFlowHistory address={d} />
          </AccordionDetails>
        </Accordion>)
      })}

    </div>
  );
}