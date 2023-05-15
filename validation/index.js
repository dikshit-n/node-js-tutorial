const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/playground')
    .then(() => console.log('Connected to mongoDB...'))
    .catch(err => console.log('Failed to connect...', err));

const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minLength: 5,
        maxLength:  255,
        // match: /pattern/
    },
    author: String,
    category: {
        type: String,
        required: true,
        enum: ['new', 'old']
    },
    tags: [ String ],
    date: { type: Date, default: Date.now() },
    isPublished: Boolean,
    price: {
        type: Number,
        // arrow function should not be used since the this keyword
        // this refers to the this operator of some 
        required: function() { return this.isPublished },
        min: 5,
        max: 200
    }
})

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = await new Course({
        name: 'Next JS',
        category: 'new',
        isPublished: true,
        price: 1
    });
    const result = await course.validate()
    console.log(result);
};

createCourse();