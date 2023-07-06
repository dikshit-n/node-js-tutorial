const express = require('express');
const { Rental, Movie, Customer } = require('../model');
const { rental: rentalValidation } = require('../validation');
const { processValidationError } = require('../utils');
const rental = express.Router();
const Fawn = require('fawn');
Fawn.init('mongodb://localhost/movie');

rental.get('/', async(req, res) => {
    const rentals = await Rental.find();
    return res.send(rentals);
});

rental.post('/', async(req, res) => {
    const { error } = await rentalValidation.validateAddRental(req.body);
    if(error) return res.status(400).send(processValidationError(error));

    // IMO, can also be done in this way - https://github.com/dikshit-n/node-js-tutorial/blob/0807831294516b298e3f309cf971466c5c8627c2/mongoose-modelling-relationships/populate.js#L46
    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.send(404).send('Customer not found !');

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(404).send('Movie not found !');

    if(movie.numberInStock === 0) return res.status(400).send('Movie not in stock');

    const rental = new Rental({
        ...req.body,
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone,
        },
        movie: {
            _id: customer._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate,
        },
    });

    // // the following two operations will be done with the concept called transactions
    // // to save them simultaneously and revert back both in case of any error in either of the operation
    // // In MongoDB we don't have the concept of transaction, instead we have two phase commit
    // // Operation 1 - save rental
    // await rental.save();
    // res.send(rental);

    // // Operation 2 - update numberInStock of the movie
    // movie.numberInStock = movie.numberInStock - 1;
    // await movie.save();

    // above implementation in mongoDB

    try {
        var task = Fawn.Task();
        await task
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, {
                $inc: {
                    numberInStock: -1
                }
            })
            .run({useMongoose: true});
        return res.send(rental); 
    } catch(err) {
        console.log(err);
        return res.status(500).send('Something went wrong');
    }
});

module.exports = rental;
