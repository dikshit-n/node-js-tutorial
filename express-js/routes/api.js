const express = require('express');
const api = express.Router();
const course = require('./course');

api.get('/', (req, res) => {
    console.log('Hello world !')
});

// nested routing - https://gist.github.com/zcaceres/f38b208a492e4dcd45f487638eff716c
api.use('/courses', course);

module.exports = api;