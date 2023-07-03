const mongoose = require('mongoose');
const express = require('express');

// database connection
mongoose.connect('mongodb://localhost:27017/mongodb-modelling-relationships').then(() => {
    console.log('Connected to MongoDB...');
}).catch(err => {
    console.log('Failed to connect: ', err);
});

// create schema
const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
})

// create models
const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    authors: {
        type: [authorSchema],
        required: true
    }
}));

const createCourse = async(name, authors) => {
    const course = new Course({
        name,
        authors
    });

    await course.save();
};

const addAuthor = async(courseId, author) => {
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save();
};

const removeAuthor = async(courseId, authorId) => {
    const course = await Course.findById(courseId);
    course.authors.pull({ _id: authorId });
    course.save();
};

// const updateAuthor = async(courseId, name) => {
//     const course = await Course.updateOne({
//         _id: courseId,
//         $set: {
//             'author.name': name
//         }
//     });
// }

// const listCourses = async() => {
//     const courses = await Course.find()
//         // include only name and exclude _id
//         .populate('author', 'name -_id')
//         // .populate('category', 'name')
//         .select('name author')
//     console.log(courses);
// };

// createCourse("Don't fall behind", [{ name: 'Dikshit' }]);
// updateAuthor('648fdc621e275ca84ceb67e6', 'Dikshit')
// addAuthor('649132556ec0da1c3b71f2a6', {name: 'Ignorance'});
removeAuthor('649132556ec0da1c3b71f2a6', '649133564c93e340df509e10');
// listCourses();
