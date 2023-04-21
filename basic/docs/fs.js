// file system
const fs = require('fs');

// synchronous
// blocking - the thread will be waiting and not available for next request until it reads the file 
const files_1 = fs.readFileSync('./');
console.log(files_1);

// asynchronous
// non-blocking - the thread will not wait for the files to be read.
// it puts a message in the event queue and starts serving the next request
// node js listens to the message in event queue and calls the callback provided once processing is done
fs.readFile('./', (err, data) => {
    console.log(err, data);
});