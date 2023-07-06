const mongoose = require('../mongoose');
const { genreSchema } = require('./genre');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        min: 1,
        max: 50,
        required: true,
    },
    genre: {
        required: true,
        type: genreSchema,
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 200,
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 200,
    }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = {
    movieSchema,
    Movie
};
