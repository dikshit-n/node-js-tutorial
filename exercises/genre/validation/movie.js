const { validate, Joi } = require('../utils');

const addMovieValidationSchema = Joi.object().keys({
    title: Joi.string().required().min(1).max(50),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().required().min(0).max(200),
    dailyRentalRate: Joi.number().required().min(0).max(200)
});

const editMovieValidationSchema = Joi.object().keys({
    title: Joi.string().required().min(1).max(50),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().required().min(0).max(200),
    dailyRentalRate: Joi.number().required().min(0).max(200)
});

async function validateAddMovie(body) {
    return await validate(body, addMovieValidationSchema);
};

async function validateEditMovie(body) {
    return await validate(body, editMovieValidationSchema);
};

module.exports = {
    addMovieValidationSchema,
    editMovieValidationSchema,
    validateAddMovie,
    validateEditMovie
}
