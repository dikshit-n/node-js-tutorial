const { validate, Joi } = require('../utils');

const addCustomerValidationSchema = Joi.object().keys({
    isGold: Joi.boolean(),
    name: Joi.string().min(3).max(50).required(),
    phone: Joi.string().min(5).max(10).required()
});

async function validateAddCustomer(body) {
    return validate(body, addCustomerValidationSchema);
};

const editCustomerValidationSchema = Joi.object().keys({
    isGold: Joi.boolean(),
    name: Joi.string().min(3).max(50).required(),
    phone: Joi.string().min(5).max(10).required()
});

async function validateEditCustomer(body) {
    return await validate(body, editCustomerValidationSchema);
};

module.exports = {
    addCustomerValidationSchema,
    editCustomerValidationSchema,
    validateAddCustomer,
    validateEditCustomer
};
