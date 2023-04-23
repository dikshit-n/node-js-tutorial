// A signal that indicates something is happened
const EventEmitter = require('events');
const emitter = new EventEmitter();

// A Http class used to create a webserver has a port to listen for requests
// when a request is sent to the port, it listens for the request and emits an event
// so that we can listen to the event and process the response

// register a listener
// a listener should be registered before the event is emitted for that listener
emitter.on('messageLogged', (arg) => {
    console.log('Listener called', arg);
});

// Raise an event
emitter.emit('messageLogged', { id: 1, url: 'https://' });
