const Joi = require('joi');

async function validateAddGenre(body) {
    const validationSchema = Joi.object().keys({
        name: Joi.string().min(3).required()
    })
    return await validate(body, validationSchema);
}

async function validateEditGenre(body) {
    const validationSchema = Joi.object().keys({
        name: Joi.string().min(3).required()
    })
    return await validate(body, validationSchema);
}

module.exports = {
    validateAddGenre,
    validateEditGenre
};
