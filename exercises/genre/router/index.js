const express = require('express');
const router = express.Router();
const genre = require('./genre');
const customer = require('./customer');

router.get('/', (req, res) => {
    return res.send('Movie Database');
});

router.use('/genre', genre);
router.use('/customer', customer);

module.exports = router;
