import React, { useState, useEffect } from 'react'
import Web3 from 'web3';
import { Grid, } from '@material-ui/core';
import Controls from "../../controls/Controls";
import { useForm, Form } from '../useForm';
import * as accountServices from "../../services/accountService";
import UploadButtons from "./upload";
import Typography from "@material-ui/core/Typography";
import Send from "./send.js";



const initialFValues = {
    receiver:'',
    amount:'',
    accountid:''
}



export default function DonationReqForm(props) {
    
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('receiver' in fieldValues)
        temp.receiver = fieldValues.receiver.length > 0 ? "" : "This field is required."
        if ('amount' in fieldValues)
        temp.amount = fieldValues.amount.length > 0 ? "" : "This field is required."
        if ('accountid' in fieldValues)
            temp.accountid = fieldValues.accountid.length != 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            // addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        
        <Form onSubmit={handleSubmit}>
            <Send/>
            {/* <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        label="Receiver"
                        name="receiver"
                        value={values.receiver}
                        onChange={handleInputChange}
                        error={errors.receiver}
                    />
                    <Controls.Input
                        label="Amount"
                        name="amount"
                        value={values.amount}
                        onChange={handleInputChange}
                        error={errors.amount}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Select
                        name="accountid"
                        label="Donate Account"
                        value={values.accountid}
                        onChange={handleInputChange}
                        options={accountServices.getAccountCollection()}
                        error={errors.accountid}
                    />
                    <UploadButtons />
                    

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid> */}
        </Form>
    )
}
