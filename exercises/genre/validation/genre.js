const Joi = require('joi');

async function validateAddGenre(body) {
    const validationSchema = Joi.object().keys({
        name: Joi.string().min(3).required()
    })
    return new Promise(async(resolve, reject) => {
        try {
            const value = validationSchema.validate(body);
            resolve(value);
        } catch(err) {
            console.log(err);
            reject({ error: err });
        }
    });
}

async function validateEditGenre(body) {
    const validationSchema = Joi.object().keys({
        name: Joi.string().min(3).required()
    })
    return new Promise(async(resolve, reject) => {
        try {
            const value = validationSchema.validate(body);
            resolve(value);
        } catch(err) {
            console.log(err);
            reject({ error: err });
        }
    });
}

module.exports = {
    validateAddGenre,
    validateEditGenre
};