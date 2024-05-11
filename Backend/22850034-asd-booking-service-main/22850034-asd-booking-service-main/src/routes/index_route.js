'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: "hello",
        error: false
    });
});

module.exports = router;