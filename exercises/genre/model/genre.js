const mongoose = require('../mongoose');
const { genreSchema } = require('../schema');

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;
