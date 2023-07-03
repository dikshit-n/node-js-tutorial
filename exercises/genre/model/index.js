const { Genre, genreSchema } = require('./genre');
const { Customer, customerSchema } = require('./customer');
const { Movie, movieSchema } = require('./movie');

module.exports = {
    genreSchema,
    customerSchema,
    movieSchema,
    Genre,
    Customer,
    Movie
};
