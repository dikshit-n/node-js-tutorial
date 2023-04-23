const http = require('http');
// create a server
// a server is an event emitter
const server = http.createServer();

// listen to the event emitted by the server
// this method is very low level, we should actually respond to (req, res) objects.
server.on('connection', (socket) => {
    console.log('New connection...');
});

// listen to a port
// whenever a request is sent to port 5000, this server will emit an event
server.listen(5000);
console.log('Listening to port 5000...')

// in real world projects, we use this method
const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.write('Hello world');
        res.end();
    }

    if(req.url === '/api/courses') {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
})

server.listen(5000);
console.log('Listening to port 5000...')