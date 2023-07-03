const express = require('express');
const { Movie, Genre } = require('../model');
const { movie: movieValidation } = require('../validation');
const { processValidationError } = require('../utils');
const movie = express.Router();
const mongoose = require('../mongoose');

movie.get('/', async(req, res) => {
    const movies = await Movie.find();
    res.send(movies);
});

movie.get('/:id', async(req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.send(movie);
});

movie.post('/', async(req, res) => {
    const { error } = await movieValidation.validateAddMovie(req.body)
    if(error) return res.status(400).send(processValidationError(error));

    const genre = await Genre.findById(new mongoose.Types.ObjectId(req.body.genreId));
    if(!genre) return res.status(404).send('Genre not found !');
    const movie = new Movie({
        ...req.body,
        genre: {
            name: genre.name,
            _id: genre._id
        }
    });
    await movie.save();
    res.send(movie);
});

movie.patch('/:id', async(req, res) => {
    const { error } = await movieValidation.validateEditMovie(req.body);
    if(error) return res.status(400).send(processValidationError(error))
    const movie = await Movie.findByIdAndUpdate(new mongoose.Types.ObjectId(req.params.id), req.body, { new: true });
    res.send(movie);
});

module.exports = movie;
