const Joi = require('joi');
const { validate } = require('../utils');

const addRentalValidationSchema = Joi.object().keys({
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
});

const editRentalValidationSchema = Joi.object().keys({
    customer: Joi.object().keys({
        name: Joi.string().required().min(1).max(50),
        isGold: Joi.boolean(),
        phone: Joi.string().required().min(5).max(10)
    }).required(),
    movie: Joi.object().keys({
        title: Joi.string().required().min(1).max(50),
        dailyRentalRate: Joi.number().required().min(0).max(200)
    }).required(),
    dateOut: Joi.date().required(),
    dateReturned: Joi.date()
});

async function validateAddRental(body) {
    return await validate(body, addRentalValidationSchema);
};

async function validateEditRental(body) {
    return await validate(body, editRentalValidationSchema);
};

module.exports = {
    addRentalValidationSchema,
    editRentalValidationSchema,
    validateAddRental,
    validateEditRental,
};
