const mongoose = require('mongoose');

const requestTemplate = new mongoose.Schema({
    userId: String,
    requestId: String,
    currentAmount: {
        type: Number,
        default: 0
    },
    blockchainAddress: String,
    amount: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// SET DEFAULT AS AMOUNT
// requestTemplate.pre('save', function (next) {
//     this.currentAmount = this.get('amount');
//     next();
// });

module.exports = mongoose.model('requesttable', requestTemplate)