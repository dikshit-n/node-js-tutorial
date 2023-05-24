const express = require('express');
const { Genre } = require('../model');
const genre = express.Router();

genre.get('/', async(req, res) => {
    const genres = await Genre.find();
    return res.send(genres);
});

genre.post('/', async(req, res) => {
    const genre = new Genre({
        name: req.body.name
    });
    const result = await genre.save();
    return res.send(result);
});

genre.patch('/:id', async(req, res) => {
    let genre;
    try {
        genre = await Genre.findById(req.params.id);
    } catch(err) {
        return res.status(500).send(`Something went wrong`);
    }
    if(!genre) return res.status(404).send(`Genre with ${req.params.id} is not found`);
    genre.name = req.body.name;
    const result = await genre.save();
    return res.send(result);
});

genre.get('/:id', async(req, res) => {
    const genre = await Genre.findById(req.params.id);
    if(!genre) res.status(404).send(`Genre with ${req.params.id} is not found`);
    return res.send(genre);
});

module.exports = genre;
