const express = require('express');

const { ROUTES } = require('./routes/routes');

const { setupProxies } = require('./services/proxy');
const { setupLogging } = require('./services/logging');
const { setupAuth } = require('./services/auth');

const app = express();

setupLogging(app);
setupAuth(app, ROUTES);
setupProxies(app, ROUTES);

module.exports = app;