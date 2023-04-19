// Each file in Node js is called a module
// Any function / variables declared inside a module, cannot be accessed outside of the module, unless it is exported using the module.exports
// There will be a module called MAIN MODULE
    // Thats where the implementation begins
// Here the main module is app.js
function log(message) {
  console.log(message);
}
module.exports.log = log;
// Now log can be imported and used in a different file
// otherFile.js
const { log } = require("./window-vs-global");

// exporting an variable
var url = "https://dikshit.live";
module.exports.url = url;

// other ways of exporting
module.exports = {
  url,
  log,
};
module.exports = log; // just exporting log by default
// Above one is an alternative to the below one
export default log;
// when you import the module
// otherFile.js
const log = require('./logger'); // log is a function which is exported by default

// Points to remember
// In a module there are certain things that should be exported
// Its not needed to export everything from a module
// A module should provide a public interface for the other modules hiding the implementation detail
// A real world example ->
    // DVD control buttons are public interfaces
    // The details involving the implementation when a control button is clicked (components responding for the button click) are called implementation details
// Here "log" function is a part of the public interface and "url" variable is an implementation detail.
// So its enough to export the log function
module.exports = {
  log,
};
