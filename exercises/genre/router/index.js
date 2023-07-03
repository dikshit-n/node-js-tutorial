const express = require('express');
const router = express.Router();
const genre = require('./genre');
const customer = require('./customer');
const movie = require('./movie');

router.get('/', (req, res) => {
    return res.send('Movie Database');
});

router.use('/genre', genre);
router.use('/customer', customer);
router.use('/movie', movie);

module.exports = router;
