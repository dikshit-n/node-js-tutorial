const { Joi } = require('../utils');

const addGenreValidationSchema = Joi.object().keys({
    name: Joi.string().min(3).required()
});

const editGenreValidationSchema = Joi.object().keys({
    name: Joi.string().min(3).required()
});

async function validateAddGenre(body) {
    return await validate(body, addGenreValidationSchema);
}

async function validateEditGenre(body) {
    return await validate(body, editGenreValidationSchema);
}

module.exports = {
    addGenreValidationSchema,
    editGenreValidationSchema,
    validateAddGenre,
    validateEditGenre
};
