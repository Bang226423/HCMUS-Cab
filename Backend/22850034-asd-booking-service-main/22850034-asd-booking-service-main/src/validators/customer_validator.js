// customerValidator.js

const { body } = require('express-validator');

const createCustomerValidator = [
    body('name').notEmpty().withMessage('Name is required'),
    body('phoneNumber').notEmpty().withMessage('Phone number is required').isMobilePhone().withMessage('Invalid phone number'),
];

module.exports = {
    createCustomerValidator,
};
