function processValidationError(error) {
    return error.details.map(el => el.message);
};

module.exports = {
    processValidationError
};