const config = require('config');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const { logger, auth } = require('./middleware');
const router = require('./routes')
const app = express();

console.log(`Application Name: ${config.get('name')}`);
console.log(`mail password: ${config.get('mail.password')}`); // config goes through all the files inside config folder to find this value

// to use json parsing in this app enable it by implementing the following line
// this following middleware will be used in the request processing pipeline
app.use(express.json());

// help to process the body of a request sent using x-www-form-urlencoded format
// parses the body from key1=value1&key2=value2 to { key1: value1, key2: value2 }
app.use(express.urlencoded({ extended: true }));

// help to serve file content as response
app.use(express.static('docs')); // serves content inside docs folder -> check http://localhost:3000/middleware.md

// third party middleware
app.use(helmet());

// morgan middleware
// helps to log https requests
app.use(morgan('tiny'));

// logger middleware
app.use(logger);
// auth middleware
app.use(auth);

// template engines
app.set('view engine', 'pug');
app.set('views', './views'); // default path to fetch view templates

// routes
app.use('/', router);

// this env variable is available in the hosting enviornment of node js
// set this PORT value in your machine by running the following command in tour terminal
    // mac - export PORT=5000
    // windows - set PORT=5000
// NOTE: use command prompt
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`));
