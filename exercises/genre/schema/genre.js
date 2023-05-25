const mongoose = require('../mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    }
});

module.exports = genreSchema;
