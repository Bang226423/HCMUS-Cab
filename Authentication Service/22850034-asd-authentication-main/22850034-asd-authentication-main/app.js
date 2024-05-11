const express = require('express');
const app = express();
const routes = require('./routes/routes');

const bodyParser = require('./services/bodyParser');
const morganMiddleware = require("./middlewares/morganMiddleware");

bodyParser(app);

app.use(morganMiddleware);
app.use(routes);

module.exports = app;