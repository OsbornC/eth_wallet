import React, { useState, useEffect, useContext } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../controls/Controls";
import { useForm, Form } from '../useForm';
import * as accountServices from "../../services/accountService";
import UploadButtons from "./upload";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

import axios from 'axios';
import {donationStore} from "../../stores/DonationStore";

const initialFValues = {
    title: '',
    amount: 0,
    description: '',
    accountid: ''
}
export default function DonationReqForm(props) {
    const { addOrEdit, recordForEdit } = props
    console.log('测试',donationStore.isUpdate)
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('title' in fieldValues)
            temp.title = fieldValues.title.length > 0 ? "" : "This field is required."
        if ('description' in fieldValues)
            temp.description = fieldValues.description.length > 0 ? "" : "This field is required."
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
            axios.post('http://localhost:4000/app/request', {
                amount: values.amount,
                title: values.title,
                description: values.description
            })
            donationStore.isUpdate = true;
            resetForm()
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
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        label="Amount"
                        name="amount"
                        value={values.amount}
                        onChange={handleInputChange}
                        error={errors.amount}
                    />
                    <Controls.Input
                        label="Title"
                        name="title"
                        value={values.title}
                        onChange={handleInputChange}
                        error={errors.title}
                    />
                    <FormControl variant="outlined">
                        <InputLabel id="demo-simple-select-label">Reason</InputLabel>
                        <Select>
                            <MenuItem value={10}>PlaceHolder</MenuItem>
                            <MenuItem value={20}>PlaceHolder</MenuItem>
                            <MenuItem value={30}>PlaceHolder</MenuItem>
                        </Select>
                    </FormControl>
                    <Controls.Input
                        label="Description"
                        name="description"
                        value={values.description}
                        onChange={handleInputChange}
                        error={errors.description}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Select
                        name="accountid"
                        label="Receive Account"
                        value={values.accountid}
                        onChange={handleInputChange}
                        options={accountServices.getAccountCollection()}
                        error={errors.accountid}
                    />
                    <Typography variant="subtitle1">Photo Upload</Typography>
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
            </Grid>
        </Form>
       
    )
}
