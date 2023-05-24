const express = require('express');
const router = express.Router();
const genre = require('./genre');

router.get('/', (req, res) => {
    return res.send('Movie Database');
});

router.use('/genre', genre);

module.exports = router;
