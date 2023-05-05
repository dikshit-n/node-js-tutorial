### Definition
- A middleware is a function that processes the req object and returns the response to the client or sends the control to another middleware
- Middlewares are executed sequentially.

```
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();

// middleware to process the body of the request
// converts json to normal object
app.use(express.json());

// logger middleware
app.use((req, res, next) => {
    console.log('Logger middleware');
    next(); // pass the control to the 'next' middleware, else the control will be stuck here
});

// auth middleware
app.use((req, res) => {
    console.log('Auth middleware');
    next();
})

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

app.get('/', 
// this function is a middleware to process the request
    (req, res) => {
        res.send(req.body.name); // when we access the body, it is already processed by another middleware to convert from json to object
    }
);
```
