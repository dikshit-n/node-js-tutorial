### Definition
- A middleware is a function that processes the req object and returns the response to the client or sends the control to another middleware
- Middlewares are executed sequentially.

```
const express = require('express');
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


app.get('/', 
// this function is a middleware to process the request
    (req, res) => {
        res.send(req.body.name); // when we access the body, it is already processed by another middleware to convert from json to object
    }
);
```
