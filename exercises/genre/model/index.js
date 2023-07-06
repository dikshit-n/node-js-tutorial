const { Genre, genreSchema } = require('./genre');
const { Customer, customerSchema } = require('./customer');
const { Movie, movieSchema } = require('./movie');
const { Rental, rentalSchema } = require('./rental');

module.exports = {
    genreSchema,
    customerSchema,
    movieSchema,
    rentalSchema,
    Genre,
    Customer,
    Movie,
    Rental,
};
