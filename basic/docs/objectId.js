const mongoose = require('mongoose');

// generate mongoDB _id
const _id = new mongoose.Types.ObjectId();
console.log(_id);
console.log(_id.getTimestamp());


// _id = 64a6e46df560acdde72e9afd

// 12 bytes
    // 4 bytes - timestamp
    // 3 bytes - machine identifier
    // 2 bytes - process identifier
    // 3 bytes - counter

// 1 byte = 8 bits
// 2 ^ 8 = 256
// 2 ^ 24 = 16M
