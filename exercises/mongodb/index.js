const express = require('express');
const app = express();
const mongoose = require('mongoose');

// connect to mongoDB
mongoose.connect('mongodb://localhost:27017/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.log('Failed to connect...', err));

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

const Course = mongoose.model('Course', courseSchema);

// exercise 1
async function getCourses() {
    const courses = await Course.find({ isPublished: true })
        .sort({ name: -1 })
        .select({ name: 1, author: 1 });
    console.log(courses);
    return courses;
};

// exercise 2
// get all frontend and backend courses,
// sort them by their price in a descending order,
// pick only their name and author,
// and display them.
async function getCourses2() {
    const courses = 
    // await Course.find({ isPublished: true, tags: { $in: ['frontend', 'backend'] } })
    await Course.find({ isPublished: true })
        .or([ { tags: 'frontend' }, { tags: 'backend' } ])
        .sort('-price')
        .select('name author price');
    console.log(courses);
    return courses;
};

// exercise 3
// get all published courses that are $15 or more,
// or have the word 'by' in their title.
async function getCourses3() {
    const courses = await Course.find({ isPublished: true })
        .or([ { price: { $gte: 15 } }, { name: /.*by.*/i } ])
        .select('name author price')
    console.log(courses);
    return courses;
};

// fetch courses
// getCourses3();
// getCourses2();
// getCourses();

// https://www.mongodb.com/docs/manual/reference/update-methods/
// Query first approach
async function updateCourse(id) {
    const course = await Course.findById(id);
    if(!course) return;
    // method 1
    course.isPublished = true;
    course.author = 'New Author';
    const result = await course.save();

    console.log(result );
    //method 2
    // course.set({
    //     isPublished: false,
    //     author: 'New Author'
    // });
};

async function updateCourse2(id) {
    // method 1
    // the updated object is not returned
    // const course = await Course.updateOne({ _id: id }, {
    //     $set: {
    //         name: 'Node js',
    //         isPublished: false
    //     }
    // });

    // method 2
    // updated object is returned
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            name: 'Node JS',
            author: 'Dikshit',
            isPublished: true
        }
    },
    { new: true }); // return the updated object

    console.log(course);
    return course;
}

// update courses
// updateCourse2('645c7cc157cfd85ec89f5972');
// updateCourse('645c7cc157cfd85ec89f5972');

// https://www.mongodb.com/docs/manual/reference/delete-methods/
async function deleteCourse(id) {
    // doesn't return the deleted course
    // await Course.deleteOne({ _id: id });
    // returns the deleted course if present, else returns null
    const course = await Course.findByIdAndDelete({ _id: id });
    console.log(course);
    return course;
}

// delete course
deleteCourse('645c7cc157cfd85ec89f5972');

// {
//     "_id": {
//       "$oid": "645c7b12f871253384e642b3"
//     },
//     "name": "Test By",
//     "author": "Test Author",
//     "tags": [
//       "frontend",
//       "course"
//     ],
//     "date": {
//       "$date": "2023-05-11T05:20:18.042Z"
//     },
//     "isPublished": true,
//     "__v": 0,
//     "price": {
//       "$numberLong": "10"
//     }
//   }