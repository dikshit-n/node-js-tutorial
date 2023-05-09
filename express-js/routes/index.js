const express = require('express');
const router = express.Router();
const api = require('./api');

router.get('/', (req, res) => {
    res.render('index', { title: 'My Express App', message: 'Hello world' });
});

router.use('/api', api);

module.exports = router;

// Notes
// 1. Nested Routing tutorial
    // https://gist.github.com/zcaceres/f38b208a492e4dcd45f487638eff716c
