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
    author: {
        // Async Validation
        type: String,
        validate: {
            // promise
            validator: (v) => Promise.resolve(v && v.length > 5),
            message: "Should be atleast 5 chars long"
        }
    },
    category: {
        type: String,
        required: true,
        enum: ['new', 'old'],
        lowercase: true, // converts the value to lowercase
        // uppercase: true,
        trim: true
    },
    tags: {
        // Custom validation
        type: Array,
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: 'Atleast one tag is required'
        }
    },
    date: { type: Date, default: Date.now() },
    isPublished: Boolean,
    price: {
        type: Number,
        // arrow function should not be used since the this keyword
        // this refers to the this operator of some 
        required: function() { return this.isPublished },
        min: 5,
        max: 200,
        get: v => Math.round(v), // this is called when a detail is fetched from DB. if price was stored as 15.8, while you receive it will be rounded
        set: v => Math.round(v) // this is called when a detail is stored to DB. if price was posted as 15.8, while you save it will be rounded
    }
})

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    try {
        const course = await new Course({
            name: 'Next JS',
            category: 'new',
            isPublished: true,
            price: 1,
            tags: ['frontend'],
            author: 'D'
        });
        const result = await course.validate()
        // console.log(result);
    } catch(err) {
        // console.log(err.errors);
        for(field in err.errors)
            console.log(err.errors[field].message);
    }
};

createCourse();