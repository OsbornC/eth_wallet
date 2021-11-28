const { request } = require('express')
const express = require('express')
const router = express.Router()
const signUpTemplateCopy = require('../models/SignUpModels')
const requestTemplateCopy = require('../models/RequestModels')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const requesttable = mongoose.model('requesttable');
const mytable = mongoose.model('mytable');

router.post('/signup', async (req, res) => {
    console.log('signup', req.body)
    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(req.body.password, saltPassword)

    const signedUpUser = new signUpTemplateCopy({
        fullName: req.body.fullName,
        userName: req.body.userName,
        donationAddress: req.body.donationAddress,
        donateTo: req.body.donateTo,
        donateAddress: req.body.donateAddress,
        email: req.body.email,
        password: securePassword

    })
    signedUpUser.save()
        .then(data => {
            res.json({
                data,
                success: true
            })
        })
        .catch(error => {
            res.json(error)
        })
})

router.post('/donate', async (req, res) => {
    requesttable.findOneAndUpdate({ blockchainAddress: req.body.receiver },
        { $inc: { currentAmount: req.body.amount } }, { overwrite: true },
        function (err, result) {
            if (err) {
                res.send(err);
            } else {
                console.log("Current Amount Updated", result);
            }
        })
    mytable.findOneAndUpdate({ userName: req.body.userName },
        { $addToSet: { donateTo: req.body.receiver } },
        function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result)
                console.log("User Donation Record Updated");
            }
        })
})

router.post('/login', async (req, res) => {
    console.log('login', req.body)
    mytable.findOne({ userName: req.body.userName },
        function (err, result) {
            if (err) {
                console.log('error')
                res.send(err);
            } else {
                if (result && bcrypt.compareSync(req.body.password, result.password)) {
                    console.log('success', req.body)
                    res.send({ "userName": req.body.userName, verified: true });
                }
                else {
                    console.log('unable')
                    res.send("Unable to verify");
                }
            }
        });
})

router.post('/request', async (req, res) => {
    const request = new requestTemplateCopy({
        requestId: req.body.requestId,
        userId: req.body.userId,
        amount: req.body.amount,
        title: req.body.title,
        reason: req.body.reason,
        description: req.body.description,
        blockchainAddress: req.body.blockchainAddress
    })
    request.save()
        .then(data => {
            res.json(data)
        })
        .catch(error => {
            res.json(error)
        })
})

router.get('/donation', async (req, res) => {
    const requesttable = mongoose.model("requesttable");
    requesttable.find({}, (err, result) => { console.log('result', result); res.json(result) });
})

router.post('/donatedAddress', async (req, res) => {
    console.log('donatedAdd', req)
    mytable.findOne({ userName: req.body.userName },
        function (err, result) {
            console.log('donated address', err, result, req.body)
            if (err) {
                res.send(err);
            } else if (result == null) {
                res.send("User not found");
            } else if (!('donateAddress' in result)) {
                res.send("Don't have any donation address");
            } else {
                res.send(result.donateTo);
            }
        });
})

router.get('/addresses', async (req, res) => {
    mytable.findOne({ userId: req.body.userId },
        function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result.donationAddress);
            }
        });
})

module.exports = router