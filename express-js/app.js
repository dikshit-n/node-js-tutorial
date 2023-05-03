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
    return res.send('Hello world');
});

app.get('/api/courses', (req, res) => {
    return res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(_ => _.id === +req.params.id);
    if(!course) return res.status(404).send('Course Not Found !');
    return res.send(course);
});

app.post('/api/courses', async(req, res) => {

    // validate whether it has the right details
    const error = await validateCourse(req.body);

    // add some validation
    // if(!req.body.name || req.body.name.length < 3) {
    //     res.status(400).send('Course name is required to be minimum 3 characters');
    //     return;
    // }

    // throw error if invalid
    if(error) return res.status(400).send(error);

    const course = {
        id: courses.length + 1,
        name: req.body.name // to use this, you should enable the json parsing in this app
    }
    courses.push(course);
    return res.send(course);
})

app.put('/api/courses/:id', async (req, res) => {
    // Lookup for the course
    const course = courses.find((_) => _.id === +req.params.id);
    // 404 - If course not found
    if(!course) return res.status(404).send('Course not found');
    // if found
    else {
        // validate whether it has the right details
        const error = await validateCourse(req.body);
        // throw error if invalid
        if(error) return res.status(400).send(error);
    }
    // return the updated course
    const updateIndex = courses.findIndex((_) => _.id === +req.params.id);
    courses[updateIndex] = {
        ...courses[updateIndex],
        name: req.body.name
    }

    return res.status(200).send(courses[updateIndex]);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find((_) => _.id === +req.params.id);
    if(!course) return res.status(404).send('Course not found');
    else {
        const index = courses.indexOf(course);
        courses.splice(index, 1);
        return res.send(course);
    } 
})

// helpers
async function validateCourse(courseDetails) {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).required(),
    });

    const error = {};
    // attempt validation
    try {
        await Joi.attempt(courseDetails, schema);
    } catch(err) {
        // console.log(err.details);
        error.message = err.details[0].message;
    };

    // return the error
    return error.message;
}

// this env variable is available in the hosting enviornment of node js
// set this PORT value in your machine by running the following command in tour terminal
    // mac - export PORT=5000
    // windows - set PORT=5000
// NOTE: use command prompt
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`));