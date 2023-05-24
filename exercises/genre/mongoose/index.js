const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/movie').then(() => {
    console.log('Connected to mongoDB...');
}).catch(err => {
    console.log('Failed to connect with mongoDB...',err);
});

module.exports = mongoose;
