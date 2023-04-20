// when changing the value of a parameter by dot notation /
// changing the value of a direct copy (copy taken without spread operator) by dot notation, will change the original value (pass by reference concept)
function exportFunc(moduleObject) {
  moduleObject.exports = "test";
  console.log(moduleObject); // { exports: test }
}

let module = { exports: { text: "Hello" } };
exportFunc(module);
// the original value will be modified since the value is modified using dot notation in exportFunc
console.log(module); // { exports: 'test' }

// ----------------------------------------------------------------------------------------------------------- //

// same result when you modify the value of a copy of the parameter taken without using spread operator
function exportFunc(moduleObject) {
  moduleObjectCopy = moduleObject;
  moduleObjectCopy.exports = "test";
  console.log(moduleObject); // { exports: 'test' }
  console.log(moduleObjectCopy); // { exports: 'test' }
}

let module = { exports: { text: "Hello" } };
exportFunc(module);
// the original value will be modified since the copy taken without spread operator is modified using dot notation in exportFunc
console.log(module); // { exports: 'test' }

// ------------------------------------------------------------------------------------------------------------ //

// different result when you modify the value of a copy of the parameter taken using spread operator
function exportFunc(moduleObject) {
  moduleObjectCopy = { ...moduleObject };
  moduleObjectCopy.exports = "test";
  console.log(moduleObject); // { exports: { text: 'Hello' } }
  console.log(moduleObjectCopy); // { exports: 'test' }
}

let module = { exports: { text: "Hello" } };
exportFunc(module);
// the original value will not be modified since only the copy taken by spread operator is modified using dot notation in exportFunc
console.log(module); // { exports: { text: 'Hello' } }

// ---------------------------------------------------------------------------------------------------------------- //

// every parameter received in a function is a local variable having the value passed while the function is called
// so modifying the entire value of the parameter will not affect the original value (from where it is passed)
function exportFunc(exportObject) {
  // exportObject is a local variable with a scope inside this function
  exportObject = "test";
  console.log(exportObject); // test
}

let module = { exports: { text: "Hello" } };
exportFunc(module.exports);
// the original value will not be modified since no dot notation is used to modify the value inside the exportFunc
console.log(module); // { exports: { text: 'Hello' } }
