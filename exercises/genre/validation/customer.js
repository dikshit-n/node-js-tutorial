const Joi = require('joi');
const { validate } = require('../utils');

async function validateAddCustomer(body) {
    const validationSchema = Joi.object().keys({
        isGold: Joi.boolean(),
        name: Joi.string().min(3).max(50).required(),
        phone: Joi.string().min(5).max(10).required()
    });
    return validate(body, validationSchema);
};

async function validateEditCustomer(body) {
    const validationSchema = Joi.object().keys({
        isGold: Joi.boolean(),
        name: Joi.string().min(3).max(50).required(),
        phone: Joi.string().min(5).max(10).required()
    });
    return await validate(body, validationSchema);
};

module.exports = {
    validateAddCustomer,
    validateEditCustomer
};
