var url = 'https://dikshit.live'; // implementation detail

const EventEmitter = require('events');

class Logger extends EventEmitter {
    log(message) {
        // make a http request to log the message in cloud
        console.log(message);
        this.emit('messageLogged', { message, id: Math.random() });
    };
};

module.exports = {
    Logger
};
