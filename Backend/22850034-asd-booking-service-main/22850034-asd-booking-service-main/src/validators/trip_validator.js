const { body, validationResult } = require('express-validator');

const validateTripData = [
    body('customerId').exists().isInt(),
    body('serviceTypeId').exists().isInt(),
    body('pickupLocation').exists().isString(),
    body('dropoffLocation').exists().isString(),
    body('startTime').optional().isISO8601().toDate(),
    body('endTime').optional().isISO8601().toDate(),
    body('fare').optional().isInt(),
    body('distance').exists().isInt(),
    body('rating').optional().isInt(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = {
    validateTripData,
};
