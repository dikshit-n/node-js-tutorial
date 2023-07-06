const mongoose = require('../mongoose');

const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                min: 1,
                max: 50,
            },
            isGold: {
                type: Boolean,
                default: false,
            },
            phone: {
                type: String,
                required: true,
                minLength: 5,
                maxLength: 10
            }
        }),
        required: true,
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                min: 1,
                max: 50
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 200,
            }
        }),
        required: true,
    },
    dateOut: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0,
    },
});

const Rental = mongoose.model('Rental', rentalSchema);

module.exports = {
    rentalSchema,
    Rental
};
