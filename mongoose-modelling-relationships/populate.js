const mongoose = require('mongoose');
const express = require('express');

// database connection
mongoose.connect('mongodb://localhost:27017/mongodb-modelling-relationships').then(() => {
    console.log('Connected to MongoDB...');
}).catch(err => {
    console.log('Failed to connect: ', err);
});

// create models
const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
}));

const Author = mongoose.model('Author', new mongoose.Schema({
    name: String,
    bio: String,
    website: String
}));

const createAuthor = async(name, bio, website) => {
    const author = new Author({
        name, bio, website
    });

    await author.save();
};

const createCourse = async(name, author) => {
    const course = new Course({
        name,
        author
    });

    await course.save();
};

const listCourses = async() => {
    const courses = await Course.find()
        // include only name and exclude _id
        .populate('author', 'name -_id')
        // .populate('category', 'name')
        .select('name author')
    console.log(courses);
};

// createAuthor('Dikshit', 'Test bio', 'Test website');
// createCourse("Don't fall behind", '64a468b77f52379730cbcd97')
listCourses();
