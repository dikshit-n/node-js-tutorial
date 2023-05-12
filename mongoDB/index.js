const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Cannot connect to mongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: {
        type: Date,
        default: Date.now()
    },
    isPublished: Boolean
});

// Obtain a class using the schema
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    // Create a course object using the class
    // This course object maps to the course document in mongoDB
    const course = new Course({
        name: 'Test 2',
        author: 'Test Author 2',
        tags: ['test-2', 'course-2'],
        isPublished: true
    });
    const result = await course.save();
    console.log(result);
}

async function getCourse() {
    // Course class created from a model can be used to query the details from DB
    const courses = await Course
        .find(
            // { author: 'Test Author 2' }
        )
        // or
        .or([ { name: { $eq: 'Test Author 2' } }, { isPublished: true } ])
        .and([])
        .limit(10)
        .sort({ name: -1 })
        .select({ name: 1, tags: 1 }); // select the properties that needs to be returned
    console.log(courses);
}

async function getCourses() {
    // Course class created from a model can be used to query the details from DB
    const courses = await Course
        // Regular Expression
        // Author Name starts with Test
        .find({ author: /^Test/ })
        // Author Name ends with 2 and ignore case
        // .find({ author: /Test$/i })
        // Author Name contains Test
        // .find({ author: /.*Test.*/i })
        .limit(10)
        .sort({ name: -1 })
        .select({ name: 1, tags: 1 })
        .count()// returns the number of details returned; // select the properties that needs to be returned
    console.log(courses);
}

// pagination
async function getCoursesPaginated() {
    const pageNumber = 2;
    const pageLimit = 10;
    // Course class created from a model can be used to query the details from DB
    const courses = await Course
        // Regular Expression
        // Author Name starts with Test
        .find({ author: /^Test/ })
        .skip((pageNumber - 1) * pageLimit) // implement pagination
        .limit(pageLimit)
        .sort({ name: -1 })
        .select({ name: 1, tags: 1 })
        .count()// returns the number of details returned; // select the properties that needs to be returned
    console.log(courses);
}

getCourse();
