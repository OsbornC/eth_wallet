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
    userId: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    donationAddress: [String],
    donateTo: [String],
    donateAddress: String,
    date: {
        type: Date,
        default: Date.now
    }
})

signUpTemplate.pre('save', function (next) {
    this.userId = this._id.toString();
    next();
});

module.exports = mongoose.model('mytable', signUpTemplate)