const config = require('config');

// different config files are created in the config folder with names of the respective environment
console.log(`Application Name: ${config.get('name')}`);
console.log(`mail password: ${config.get('mail.password')}`); // config goes through all the files inside config folder to find this value
