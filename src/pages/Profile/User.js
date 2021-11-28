import React, { useState , useEffect} from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core';
import Controls from "../../controls/Controls";
import CloseIcon from '@material-ui/icons/Close';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Profile from "./Profile"

export default function User(props) {
  const {open} = props;
  const [openPopup, setOpen] = useState(open)
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setOpen(open)
    //Runs on every render
    console.log("open is ",openPopup)
  }, [props]);
    return (

      <Dialog
        open={openPopup}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          test
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                    </Typography>
                    <Controls.ActionButton
                        color="secondary"
                        onClick={handleClose}>
                        <CloseIcon />
                    </Controls.ActionButton>
                    <Route path="/login" component={Profile} />
                </div>
          </DialogTitle>
      </Dialog>
    );
  }
  
  