// There are some global objects in node
console.log();
setTimeout();
setInterval();

// These are available from the window object in the browser environment
window.setTimeout();
window.setInterval();
window.console.log();

// Any vars declared in a file is also available in the window object
var message = "Test";
console.log(window.message); // Test

// But since window object is undefined in node js (outside the browser environment), these are not accessed using the window object
console.log(window); // undefined
// instead there is an object called "global" (for node)
global.console.log();
global.setInterval();
global.setTimeout();

// However unlike window, global object cannot be used to access any vars declared in the file
console.log(global.message); // undefined
// This is used to prevent the message variable being used outside of this file
// There comes the concept of modularity
