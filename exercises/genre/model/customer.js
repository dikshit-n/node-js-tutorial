const mongoose = require("../mongoose");

const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold: {
        type: Boolean,
        required: false,
        default: false
    },
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    phone: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 10
    }
}));

module.exports = Customer