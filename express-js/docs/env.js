const express = require('express');
const app = express();

app.get('env') // "development" if process.env.NODE_ENV is undefined
process.env.NODE_ENV;