const express = require('express');

function bodyParser(app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
}

module.exports = bodyParser;