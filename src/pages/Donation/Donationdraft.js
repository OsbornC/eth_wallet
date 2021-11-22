import React, { useState } from 'react'
import DonationReqForm from "./DonationReqForm";
import { makeStyles } from '@material-ui/core';
import Controls from "../../controls/Controls";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../Popup";
import Send from "./send.js";
import DonationTab from './DonationTab';
import Typography from "@material-ui/core/Typography";
import DetectAccount from './DetectAccount';
import './Donation.css';
import poster from './poster.jpeg'

const useStyles = makeStyles(theme => ({
    searchInput: {
        width: '75%'
    },
    newButton: {
        verticalAlign: 'top',
        borderRadius:'45px',
        width:'15vw',
        height:'9vh',
        marginTop:'30px'
    }
}))


export default function DonationDraft() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenDonate] = useState(false)
    const [openDonreq, setDonreq] = useState(false);


    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.fullName.toLowerCase().includes(target.value))
            }
        })
    }

    const addOrEdit = (resetForm) => {
        resetForm()
        setRecordForEdit(null)
        setOpenDonate(false)
        setDonreq(false)
    }

    return (
        <>
            <div className = "donationMain">
                    <div className="donationBlock">
                        <DonationTab />
                    </div>

                    <div className="donationBlock" style={{marginTop:'2%'}}>
                        <div>
                            <Controls.Button
                                text="Donate"
                                variant="contained"
                                style={{backgroundColor:"#194db0", fontSize:"25px"}}
                                className={classes.newButton}
                                onClick={() => { setOpenDonate(true); }}
                            />
                        </div>
                        <div>
                            <Controls.Button
                                text="Request"
                                variant="outlined"
                                startIcon={<AddIcon />}
                                style={{border:"3px solid #194db0", fontSize:"25px"}}
                                className={classes.newButton}
                                onClick={() => { setDonreq(true); }}
                            />
                        </div>
                        <div className="poster">
                            <p>Did you know that Chainbase helped 10k homeless to find shelter?</p>
                        </div>
                        
                    </div>
            <Popup
                title="Request Donation"
                open={openDonreq}
                handleClose={setDonreq}
            >
                <DonationReqForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
                    <DetectAccount/>
            </Popup>
            <Popup
                    title="Donate"
                    open={openPopup}
                    handleClose={setOpenDonate}
                >
                    <Send />
                </Popup>
            </div>
            
        </>
    )
}
