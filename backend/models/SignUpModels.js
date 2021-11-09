const mongoose = require('mongoose');

const signUpTemplate = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    blockchainAddresses: [String],
    donateTo: [[String, Number]],
    donateAddress: String,
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('mytable', signUpTemplate)