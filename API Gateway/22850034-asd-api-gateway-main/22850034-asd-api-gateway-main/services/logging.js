const logger = require('morgan');
const fs = require('fs')

const setupLogging = (app) => {
    app.use(logger('combined', { stream: fs.createWriteStream('./logs/console.log', { flags: 'a' }) }));
    app.use(logger('dev'));
}

exports.setupLogging = setupLogging;