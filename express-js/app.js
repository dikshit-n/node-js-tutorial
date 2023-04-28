const Joi = require('joi');
const express = require('express');
const app = express();

// to use json parsing in this app enable it by implementing the following line
// this following middleware will be used in the request processing pipeline
app.use(express.json());

const courses = [
    { id: 1, name: 'Test 1' },
    { id: 2, name: 'Test 2' },
    { id: 3, name: 'Test 3' }
];

// define a get route
app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(_ => _.id === +req.params.id);
    if(!course) res.status(404).send('Course Not Found !');
    res.send(course);
});

app.post('/api/courses', async(req, res) => {

    const schema = Joi.object().keys({
        name: Joi.string().min(3).required()
    })
    const error = {};

    try {
        await Joi.attempt(req.body, schema);
    } catch(err) {
        error.message = err.details[0].message;
    }
    // console.log(result.details);

    // add some validation
    // if(!req.body.name || req.body.name.length < 3) {
    //     res.status(400).send('Course name is required to be minimum 3 characters');
    //     return;
    // }

    if(error.message) {
        res.status(400).send(error.message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name // to use this, you should enable the json parsing in this app
    }
    courses.push(course);
    res.send(course);
})

// this env variable is available in the hosting enviornment of node js
// set this PORT value in your machine by running the following command in tour terminal
    // mac - export PORT=5000
    // windows - set PORT=5000
// NOTE: use command prompt
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`));