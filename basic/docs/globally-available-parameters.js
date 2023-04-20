// some variables are available to access globally
// how is it made possible ?
    // each module in node is wrapped inside a function which receives certain parameters (they are the global parameters we are talking about)

// take this following code block as an example
function log(message) {
    console.log(message);
};

module.exports.log = log;

// this is wrapped this way
(function(exports, require, module, __filename, __dirname) {
    function log(message) {
        console.log(message);
    };
    
    // correct
    module.exports.log = log; 

    // correct
    exports.log = log;

    // wrong
    exports = log; // check [here](https://github.com/dikshit-n/node-js-tutorial/blob/master/basic/docs/parameter-reference.js)

    // correct
    module.exports = log;
});
