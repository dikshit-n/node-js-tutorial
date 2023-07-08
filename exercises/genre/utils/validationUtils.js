const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

function processValidationError(error) {
    return error.details.map(el => el.message);
};

function validate(body, validationSchema) {
    return new Promise(async(resolve, reject) => {
        try {
            const value = await validationSchema.validate(body);
            resolve(value);
        } catch(err) {
            reject({ error: err });
        }
    });
};

module.exports = {
    processValidationError,
    validate,
    Joi
};
