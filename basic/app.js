const { Logger } = require("./logger");
const logger = new Logger();

logger.on('messageLogged', (args) => {
    console.log('Listener logged', args);
});

logger.log("Test");
