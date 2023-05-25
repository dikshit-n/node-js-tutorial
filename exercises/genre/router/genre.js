const express = require('express');
const { Genre } = require('../model');
const mongoose = require('../mongoose');
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

// query first
// genre.patch('/:id', async(req, res) => {
//     const genre = await Genre.findById(req.params.id);
//     if(!genre) return res.status(404).send(`Genre with ${req.params.id} is not found`);
//     genre.name = req.body.name;
//     const result = await genre.save();
//     return res.send(result);
// });

// ------------------------------------------------------------------------------------------ //

// update first
genre.patch('/:id', async(req, res) => {
    const genre = await Genre.findOneAndUpdate(new mongoose.Types.ObjectId(req.params.id), { name: req.body.name }, { new: true });
    if(!genre) return res.status(404).send(`Genre with ${req.params.id} is not found`);
    return res.send(genre);
});

genre.get('/:id', async(req, res) => {
    const genre = await Genre.findById(req.params.id);
    if(!genre) res.status(404).send(`Genre with ${req.params.id} is not found`);
    return res.send(genre);
});

genre.delete('/:id', async(req, res) => {
    const genre = await Genre.findByIdAndDelete(new mongoose.Types.ObjectId(req.params.id))
    if(!genre) return res.status(404).send(`Genre with ${req.params.id} is not found`);
    return res.send(genre);
});

module.exports = genre;
