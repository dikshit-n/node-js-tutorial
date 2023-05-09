const express = require('express');
const app = express();

// send a dynamic template as response
app.set('view engine', 'pug'); // there are alternatives to pug like 'mustache', 'ejs', etc.,
app.set('views', './views') // default path to fetch view templates

app.get('/', (req, res) => {
    res.render('index', { title: 'My Express app', message: 'Hello world !' });
});