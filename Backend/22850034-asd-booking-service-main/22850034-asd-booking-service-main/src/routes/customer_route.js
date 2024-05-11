const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer_controller');

router.get('/', customerController.getAllCustomers);
router.post('/', customerController.createCustomer);
router.get('/search', customerController.searchCustomerPhone);
router.get('/:id', customerController.getCustomerById);

module.exports = router;
